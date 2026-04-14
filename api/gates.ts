import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_GATE_IMAGES_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_GATE_IMAGES_SECRET_ACCESS_KEY!,
    },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const all: string[] = [];
        let continuationToken: string | undefined;

        // Paginate through all objects in the bucket
        do {
            const command = new ListObjectsV2Command({
                Bucket: process.env.R2_GATE_IMAGES_BUCKET!,
                ContinuationToken: continuationToken,
            });
            const response = await client.send(command);

            for (const obj of response.Contents ?? []) {
                const key = obj.Key ?? '';
                // Keys look like "S1/S1-01.webp" — extract "S1-01"
                const filename = key.split('/').pop()?.replace('.webp', '');
                if (filename) all.push(filename);
            }

            continuationToken = response.NextContinuationToken;
        } while (continuationToken);

        const gates: Record<string, string[]> = { standard: [], premium: [], lux: [] };

        for (const id of all) {
            const prefix = id.split('-')[0]; // S1, P2, L3
            if (prefix.startsWith('S')) gates.standard.push(id);
            else if (prefix.startsWith('P')) gates.premium.push(id);
            else if (prefix.startsWith('L')) gates.lux.push(id);
        }

        // Sort each tier numerically
        for (const tier of Object.keys(gates)) {
            gates[tier].sort((a, b) => {
                const na = parseInt(a.split('-')[1]);
                const nb = parseInt(b.split('-')[1]);
                return na - nb;
            });
        }

        res.setHeader('Cache-Control', 'no-store');
        res.json(gates);
    } catch (err) {
        console.error('R2 list error:', err);
        res.status(500).json({ error: 'Failed to list gates from R2' });
    }
}
