/**
 * Migration script: Google Drive → Cloudflare R2
 * Downloads each image from Drive, converts to WebP (quality 85), uploads to R2.
 * Run once: node scripts/migrate-to-r2.mjs
 */
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const R2_ENDPOINT  = 'https://6835cff4ef7c885e56d2e6d35e5b740a.r2.cloudflarestorage.com';
const R2_BUCKET    = 'temir-usta';
const ACCESS_KEY   = 'f29ebcd4414b904fdf6906e5c37db73e';
const SECRET_KEY   = 'd490d32c2c6dce1b24c4f2ac6f95fcbcc12741af9deb30c71e7a47f59cfc0cb4';

const s3 = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY },
});

// All images: { id, driveId }
// Category is derived from prefix: S1 / P2 / L3
const images = [
  // ── Standard (S1) ──
  { id: 'S1-01', driveId: '1ID3sKVWap4Biv0h6ZfFBFTkcKV4h1X0u' },
  { id: 'S1-02', driveId: '1Jz4WnRz0JOYr7S3DgsEqD8sO6J3x-jTg' },
  { id: 'S1-03', driveId: '1MwQjLHr-r5x-dl9dPUtPL26SrYWXEzv-' },
  { id: 'S1-04', driveId: '1n6MsacGtzoB48UtkpnbmIcu3hL2IRVsL' },
  { id: 'S1-05', driveId: '1tZSrdL5PwPxhXeWLSxEhtV18ozHB8GWj' },
  { id: 'S1-06', driveId: '1aVJLIWQgX0AOa4lgkgB5Zg8ElD6U71C-' },
  { id: 'S1-07', driveId: '1kE6s6xAeJkDYoPUcda6vLnohauD5hJFA' },
  { id: 'S1-08', driveId: '1MloKrrK5M_nAjx408MkW5bPgOZPY24Zw' },
  { id: 'S1-09', driveId: '1w9C1PjjSJZzKPz4WbjO-vvPIq4YO8b7h' },
  { id: 'S1-10', driveId: '1CnowBZ1vduRoagfnW7NoGxK7kYMjOMfG' },
  { id: 'S1-11', driveId: '1wqm8-bhUSHOb64LM_C7J_6lOlHZFqBrt' },
  { id: 'S1-12', driveId: '1x1VBiFwUegEicZCrnz2Gr58h3ItWFu5d' },
  { id: 'S1-13', driveId: '1aPtJGJN3ruK58uDQ9e-uWVEvq0NgruoQ' },
  { id: 'S1-14', driveId: '1y0aAAGpb-LoR532rTsRdAv0LR2A04OOF' },
  { id: 'S1-15', driveId: '1cMSGvHv67rcEowKcz5HPi96LuoG6SceF' },
  { id: 'S1-16', driveId: '1CVrHHtNynE0tGk1-fB8CEBV2VaBPPItp' },

  // ── Premium (P2) ──
  { id: 'P2-01', driveId: '10OQ7GdrYplHeg-KwESlPogtjvBKiGBgd' },
  { id: 'P2-02', driveId: '1CbKSKzoiIrZ1Dz_HksZWNnMvZPZOmxFe' },
  { id: 'P2-03', driveId: '1Ckmw_p1I8MyLWtGY4-xnK4rVFdpTl9TT' },
  { id: 'P2-04', driveId: '1KJje2DDNFczZCbhUFfgvJhIKskTudFHX' },
  { id: 'P2-05', driveId: '1GJ6-OTEH61B6vZZwl9gs8Ngq7QGB9C6a' },
  { id: 'P2-06', driveId: '1rEOxYHos50yabjc4gLsIdB4VCUJ593Yt' },
  { id: 'P2-07', driveId: '1EbBbRaBxBTZ3emtvK97sjd92-Aja_CzV' },
  { id: 'P2-08', driveId: '1BqY6_NfXwy5lJ_-RCFGxDxGzFhGMTyG9' },
  { id: 'P2-09', driveId: '1w47OdWFYVZnSSOlm78Oigf2zYMhX-nWz' },
  { id: 'P2-10', driveId: '1QP1VdzcBOdw0_zor2jc5XwPaoGOHc8HH' },
  { id: 'P2-11', driveId: '1v0snV_wTVTjwTvnNqyGyGMuq5ZY9V9cN' },
  { id: 'P2-12', driveId: '1jslvVVk9zgVLuWRpWBjegzZ5Q1DAylkx' },
  { id: 'P2-13', driveId: '1DlFetBrSmIgLCBA2C_ncjbWg-_LMmLYd' },
  { id: 'P2-14', driveId: '1cMdWTX1HGfWIsU6qvb7oMwykSjb8Devd' },
  { id: 'P2-15', driveId: '1bZE_rR3pwkF-MY04C-6Eb7aciFf5H7VO' },
  { id: 'P2-16', driveId: '1IViu2mGNCnlR7stF3ktAcr6zBVbhvhZH' },
  { id: 'P2-17', driveId: '1FNp3Q-4cH4-f2z7S1HAIHfX6TDJWANlA' },
  { id: 'P2-18', driveId: '1_w_z25guh7SwTLl__h87IYNURpi3Sj-m' },
  { id: 'P2-19', driveId: '1uvgSn3QVJhxcQPnx0oJPNCg7a2zWwvgy' },
  { id: 'P2-20', driveId: '1Q8CYo7jvLfss8fLhdb0X6GjOfBrK0F84' },
  { id: 'P2-22', driveId: '1gzDmus9ERiKINmN3wYQyzImBZ2y1AO-a' },
  { id: 'P2-23', driveId: '14qVq2IDbGLDbZK9jBMqg1ErwqjQEt7dO' },
  { id: 'P2-24', driveId: '18Czh97cZq3214LN8gEUspnxFgNk2a6ua' },
  { id: 'P2-25', driveId: '1w3KJyfVZtiZ2kvBrav6eYQMbZJwNa_vU' },
  { id: 'P2-26', driveId: '1OpENSvj1OrKdijRoHAA4w9LJBKYoFmwE' },
  { id: 'P2-27', driveId: '1OHAnUWz3mghB1H-n1pBWWlU9DpTm4Dr-' },
  { id: 'P2-29', driveId: '1p-XAO8Bw3yjZGYPs4kyqIJppTjr7n7TO' },
  { id: 'P2-30', driveId: '1wua14MVSQb2gy5qPt6pKYL6Cc2nSkbBi' },
  { id: 'P2-31', driveId: '1tHZTVI5ZVLB-yMzxtDSnpCtkoiuMsHZM' },
  { id: 'P2-32', driveId: '1EuDU9ByEy2E-G8ii0yaJ_nqYxwhp91OF' },
  { id: 'P2-33', driveId: '1SG3yTFXsc03l81OdOaRmlLmt34YlSUus' },
  { id: 'P2-34', driveId: '1GTjoRvqiYfFSnwhLuSYk2gfjES3aE3kl' },
  { id: 'P2-35', driveId: '1uziFt0XPictbchad5zDSTsMavDJqFQiQ' },
  { id: 'P2-36', driveId: '1LC4IMvPWrFfORxssBwhNy4rNXA2f6I9s' },
  { id: 'P2-37', driveId: '1PeMBea87iCJkyCX-R2Wz4y2DWvQdw0cs' },
  { id: 'P2-38', driveId: '1ExMFTTgsONqLYB66w6kS3ZYsTvagz48I' },
  { id: 'P2-39', driveId: '1bDGn2517HuDJiE2YW9NDo_NsKbCuQCSm' },
  { id: 'P2-40', driveId: '1TfICw5EoTfW1EwUT-zR_I5CkN--96gmh' },
  { id: 'P2-41', driveId: '1oi2YSSpHf0mRyXutZ1uBXPylYKjpKmrQ' },
  { id: 'P2-42', driveId: '1XzaUlZY814kVM2xoDGQjbp7_Eyn4LrTe' },
  { id: 'P2-43', driveId: '1fg-OMewxBHWLu97tKqxvTlCPAA5C2R7P' },
  { id: 'P2-44', driveId: '1etCeQf8PToTTDKDcx7kXZ1GElXoJPa1_' },

  // ── Lux (L3) ──
  { id: 'L3-01', driveId: '13kjREIx3hELPS6FlE3-Qm8UmhiU15LlL' },
  { id: 'L3-02', driveId: '1atMmX2BN59aHUMYBprG4W6pWLSVkCU3s' },
  { id: 'L3-03', driveId: '19D1gx_obONaogl06MkfSlegATkg3JSAN' },
  { id: 'L3-04', driveId: '1r4ZxmZWfG_-HY30P64BLsG3y_eu4OHFd' },
  { id: 'L3-05', driveId: '1FKPmsC7u8GZ3_HDg_not80JUP8mDeOHW' },
  { id: 'L3-06', driveId: '1e2W5OgxJa9YZBmYYGRO6Qxz0ZACnvn5c' },
  { id: 'L3-07', driveId: '1DLfa-dEJPAp_maXFE_q3ePmyCqsMqxBF' },
  { id: 'L3-08', driveId: '1tETgyLL1Q_ZOBRUfjOJwmIOKLbjLqVyJ' },
  { id: 'L3-09', driveId: '1q4xcV9w_Omg7SWLPTMpr5-RNr8GOEEei' },
  { id: 'L3-10', driveId: '1I6rVYeIPmhpi9FdEhIsk8icFc4OOYleV' },
  { id: 'L3-11', driveId: '1FvqDhihdgPK7bmrgSKFlSMAgic6Z1tR6' },
  { id: 'L3-12', driveId: '100-esu7kUTLajaZwlsHF5a_HZ0WigxAb' },
  { id: 'L3-13', driveId: '15dK5xWnAzEfISXTzibuNVXZImLHcfXIE' },
  { id: 'L3-14', driveId: '1KTmImzIoqZjQDXII_y9HGeMmrkIbTz4V' },
  { id: 'L3-15', driveId: '1-0B9k_RW-e_xi9MlN1_5pQtlHFJz1sAm' },
  { id: 'L3-18', driveId: '1YyakowNP6nNhOaZhiyegs2HsQIo4fWWO' },
  { id: 'L3-19', driveId: '1yVZM8CJoQDZ4oMIPu61GFhiMgQtPHZ4S' },
  { id: 'L3-20', driveId: '1s8vWgKqWZ-6MzWameVQAY5fbDwC-hsDG' },
  { id: 'L3-21', driveId: '1io9TNlEjYXaN_070xWcTk6xRxOY-3G4o' },
  { id: 'L3-22', driveId: '1pz_h1b5b4YhIavmpuiMa8ek3Mp6pbOfV' },
  { id: 'L3-23', driveId: '1qddLniC7zX6dJXkliSLMNBsIUbsd48Xz' },
  { id: 'L3-25', driveId: '1Mby_uKMwErQqflN3kKfUfEnNC24rJRPg' },
  { id: 'L3-26', driveId: '1yLoRZxNc860aHn4z0QEO19LiQRhwAXtw' },
  { id: 'L3-27', driveId: '11RX-kEKkNozoGukUAmTonC4NwZNQyuw3' },
  { id: 'L3-28', driveId: '1Narum0KBgwTZSmA5PaqLxoKMdycbYc4w' },
  { id: 'L3-29', driveId: '190EY9C44g07bv1P1jo4mKLSArqTZk0fh' },
  { id: 'L3-30', driveId: '1-96TavGQaI6ybbdtJd9SX_mkA7Rv-TBA' },
  { id: 'L3-31', driveId: '1Nzl4PCuPWGGZjO6xOsvptjK-XtM7_Xkn' },
  { id: 'L3-32', driveId: '1F5MJlMB7Xy5iusts-dcKgp3r_w6bBdIm' },
  { id: 'L3-33', driveId: '1HlpfZ_54mcUHM9RmydervIIcSUj5RSC7' },
  { id: 'L3-34', driveId: '1eLgViFFciaCzxY1HAzvUl_NfOXEswgZy' },
  { id: 'L3-35', driveId: '1RAeJSJQeKosdlZK3ZS7gAf0c5E8Det-2' },
  { id: 'L3-36', driveId: '1zp0VDEk0P_hVFWhehnZobHzVmunyrRvp' },
  { id: 'L3-37', driveId: '1Qk5lSGjIK8Vw74XHCEKafzD7Hd9bJYk2' },
  { id: 'L3-38', driveId: '10vVlN4l04RlhPvexRiEBxoyRmYlXSeN0' },
  { id: 'L3-39', driveId: '1OEQrsvrc8yDO9BVhaLjZXZdo-w0wclrY' },
  { id: 'L3-40', driveId: '1ntCyAQYwXsYY_aKUWKiBvrFPdnIm0Q3z' },
  { id: 'L3-41', driveId: '1Rx7pKF4uzVMKLwAQm-hMgGasX5pFaphI' },
  { id: 'L3-42', driveId: '1MWQa6k6Iwafqa7OnEk-BufDJU3zRhQf2' },
  { id: 'L3-43', driveId: '10N8Na_ywRtSTxe2OzVqmOOxpijJGnT7p' },
  { id: 'L3-44', driveId: '17d7L5jfp6VlLA9-1T5Wmc2H9DGqW5ZjG' },
  { id: 'L3-45', driveId: '1fHyQHzMJt2riqzbq7ZaPFrQsRDCtLzEe' },
  { id: 'L3-46', driveId: '1C5YeKV87JjAikp_RpLGTuVGU42g1cgtU' },
  { id: 'L3-47', driveId: '1p8OQabBLwkLanMW4EIk1ITxtCyNK7Y5d' },
  { id: 'L3-48', driveId: '1a6uC1tRDiPCqdCQS04H5BBAWdaKDZ-bX' },
  { id: 'L3-49', driveId: '1LHG0aXRHQ0MeFkpUtx1rABitjurczMvi' },
  { id: 'L3-50', driveId: '1R8u86Tj65Lnn5K9SQUqudazfQSr6uSzw' },
  { id: 'L3-51', driveId: '1gIUO5Fi6NEJpHnBN5CU5AFbebBf2eyag' },
  { id: 'L3-52', driveId: '1l5eAJdzn8rctJD4YxBDLZc8usXkVRcSd' },
  { id: 'L3-53', driveId: '1IZWlKodYe0-i2sPSGtZdTJHkJk8WbpBI' },
  { id: 'L3-54', driveId: '1So1cwRyuMuygigQdlDMfAjdMT1-BiA_7' },
  { id: 'L3-55', driveId: '1B55dFzo4LzXepjp0asUNZF5ABv4K6Cfl' },
  { id: 'L3-56', driveId: '1jdTRqcRrB_CTAzYlZCMBXF2EbkYHv0TM' },
  { id: 'L3-57', driveId: '1FzLqRTBVvBM0oaRcTrsKC72MFxliAHNd' },
  { id: 'L3-58', driveId: '1o-ICAZdPPlOkRE3qxiUQ3DeEJdermv9f' },
  { id: 'L3-59', driveId: '1vcycCgq-uBwGv429l6H6XmlMUhwVT4ZB' },
  { id: 'L3-60', driveId: '13CCHTbtjhlFV_YdohRAgDaeLvPGhVvgW' },
  { id: 'L3-61', driveId: '15E4uJn8tQzWuuXfUclnsR64xmLpWNBI7' },
  { id: 'L3-62', driveId: '1OqQYRThTFTxbJUiEPO4zuyfwj8uNYDgO' },
  { id: 'L3-63', driveId: '1Tlp2dJr6Ds21YJmTGj5mxt2sN9heiPuc' },
  { id: 'L3-64', driveId: '1W5izGkmONrUh4IsfxvzAEWKmaBkiqJbA' },
  { id: 'L3-65', driveId: '1y4P6Rd0x2_2bSI0JJ3PWv73NXqc-WJpA' },
  { id: 'L3-66', driveId: '1uJ55FrDnRBV6b1s5mRbZtyu7VM7Zu7r2' },
  { id: 'L3-67', driveId: '18bzgUgbvNWOTcdoZTtFp2LoTNBQGoqiq' },
  { id: 'L3-69', driveId: '1SeyNgV8twteDiLwxjJsGq5nAeUFlETNL' },
];

async function alreadyUploaded(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function downloadFromDrive(driveId) {
  // Use highest available Drive thumbnail resolution
  const url = `https://drive.google.com/thumbnail?id=${driveId}&sz=w2000`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  return Buffer.from(buf);
}

async function compressToWebP(inputBuf) {
  return sharp(inputBuf)
    .webp({ quality: 85, effort: 5 })
    .toBuffer();
}

async function uploadToR2(key, buf) {
  await s3.send(new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buf,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
  }));
}

const CONCURRENCY = 4;
const failed = [];

async function processOne(img) {
  const category = img.id.split('-')[0]; // S1, P2, L3
  const key = `${category}/${img.id}.webp`;

  if (await alreadyUploaded(key)) {
    console.log(`  skip  ${key} (already exists)`);
    return;
  }

  const raw = await downloadFromDrive(img.driveId);
  const webp = await compressToWebP(raw);
  await uploadToR2(key, webp);
  const savePct = (((raw.byteLength - webp.byteLength) / raw.byteLength) * 100).toFixed(1);
  console.log(`  ✓  ${key}  ${(raw.byteLength/1024).toFixed(0)}KB → ${(webp.byteLength/1024).toFixed(0)}KB  (-${savePct}%)`);
}

async function main() {
  console.log(`Migrating ${images.length} images to R2…\n`);
  let done = 0;

  for (let i = 0; i < images.length; i += CONCURRENCY) {
    const batch = images.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async img => {
      try {
        await processOne(img);
      } catch (err) {
        console.error(`  ✗  ${img.id}: ${err.message}`);
        failed.push({ id: img.id, error: err.message });
      }
    }));
    done += batch.length;
    console.log(`  [${done}/${images.length}]`);
  }

  if (failed.length > 0) {
    console.log('\nFailed:');
    failed.forEach(f => console.log(`  ${f.id}: ${f.error}`));
    process.exit(1);
  } else {
    console.log('\nAll done!');
  }
}

main();
