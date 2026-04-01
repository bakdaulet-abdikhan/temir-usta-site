/**
 * Google Apps Script to rename gate images in Google Drive.
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this entire script
 * 4. Click "Run" (play button) on the `renameAllGates` function
 * 5. Authorize when prompted (it needs Drive access)
 * 6. Check the Execution Log for results
 */

function renameAllGates() {
  // Standard folder
  renameFolder('1Qoc7ZymwCoP_lpgCB_baGPUjirM1nsVl', {
    '1ID3sKVWap4Biv0h6ZfFBFTkcKV4h1X0u': 'S1-01',
    '1Jz4WnRz0JOYr7S3DgsEqD8sO6J3x-jTg': 'S1-02',
    '1MwQjLHr-r5x-dl9dPUtPL26SrYWXEzv-': 'S1-03',
    '1n6MsacGtzoB48UtkpnbmIcu3hL2IRVsL': 'S1-04',
    '1tZSrdL5PwPxhXeWLSxEhtV18ozHB8GWj': 'S1-05',
    '1aVJLIWQgX0AOa4lgkgB5Zg8ElD6U71C-': 'S1-06',
    '1kE6s6xAeJkDYoPUcda6vLnohauD5hJFA': 'S1-07',
    '1MloKrrK5M_nAjx408MkW5bPgOZPY24Zw': 'S1-08',
    '1w9C1PjjSJZzKPz4WbjO-vvPIq4YO8b7h': 'S1-09',
    '1CnowBZ1vduRoagfnW7NoGxK7kYMjOMfG': 'S1-10',
    '1wqm8-bhUSHOb64LM_C7J_6lOlHZFqBrt': 'S1-11',
    '1x1VBiFwUegEicZCrnz2Gr58h3ItWFu5d': 'S1-12',
    '1aPtJGJN3ruK58uDQ9e-uWVEvq0NgruoQ': 'S1-13',
    '1y0aAAGpb-LoR532rTsRdAv0LR2A04OOF': 'S1-14',
    '1cMSGvHv67rcEowKcz5HPi96LuoG6SceF': 'S1-15',
    '1CVrHHtNynE0tGk1-fB8CEBV2VaBPPItp': 'S1-16',
  });

  // Premium folder
  renameFolder('1M4hvh8q1IX2B7LmWQMbGR8QYcfr93K-X', {
    '10OQ7GdrYplHeg-KwESlPogtjvBKiGBgd': 'P2-01',
    '1CbKSKzoiIrZ1Dz_HksZWNnMvZPZOmxFe': 'P2-02',
    '1Ckmw_p1I8MyLWtGY4-xnK4rVFdpTl9TT': 'P2-03',
    '1KJje2DDNFczZCbhUFfgvJhIKskTudFHX': 'P2-04',
    '1GJ6-OTEH61B6vZZwl9gs8Ngq7QGB9C6a': 'P2-05',
    '1rEOxYHos50yabjc4gLsIdB4VCUJ593Yt': 'P2-06',
    '1EbBbRaBxBTZ3emtvK97sjd92-Aja_CzV': 'P2-07',
    '1BqY6_NfXwy5lJ_-RCFGxDxGzFhGMTyG9': 'P2-08',
    '1w47OdWFYVZnSSOlm78Oigf2zYMhX-nWz': 'P2-09',
    '1QP1VdzcBOdw0_zor2jc5XwPaoGOHc8HH': 'P2-10',
    '1v0snV_wTVTjwTvnNqyGyGMuq5ZY9V9cN': 'P2-11',
    '1jslvVVk9zgVLuWRpWBjegzZ5Q1DAylkx': 'P2-12',
    '1DlFetBrSmIgLCBA2C_ncjbWg-_LMmLYd': 'P2-13',
    '1cMdWTX1HGfWIsU6qvb7oMwykSjb8Devd': 'P2-14',
    '1bZE_rR3pwkF-MY04C-6Eb7aciFf5H7VO': 'P2-15',
    '1IViu2mGNCnlR7stF3ktAcr6zBVbhvhZH': 'P2-16',
    '1FNp3Q-4cH4-f2z7S1HAIHfX6TDJWANlA': 'P2-17',
    '1_w_z25guh7SwTLl__h87IYNURpi3Sj-m': 'P2-18',
    '1uvgSn3QVJhxcQPnx0oJPNCg7a2zWwvgy': 'P2-19',
    '1Q8CYo7jvLfss8fLhdb0X6GjOfBrK0F84': 'P2-20',
    '130jt30cUF4eB4BYBdrp0hPt5Qvt46M5m': 'P2-21',
    '1gzDmus9ERiKINmN3wYQyzImBZ2y1AO-a': 'P2-22',
    '14qVq2IDbGLDbZK9jBMqg1ErwqjQEt7dO': 'P2-23',
    '18Czh97cZq3214LN8gEUspnxFgNk2a6ua': 'P2-24',
    '1w3KJyfVZtiZ2kvBrav6eYQMbZJwNa_vU': 'P2-25',
    '1OpENSvj1OrKdijRoHAA4w9LJBKYoFmwE': 'P2-26',
    '1OHAnUWz3mghB1H-n1pBWWlU9DpTm4Dr-': 'P2-27',
    '1QWfGk21sd7PnPRSX2x7eXck_9DXTEDQL': 'P2-28',
    '1p-XAO8Bw3yjZGYPs4kyqIJppTjr7n7TO': 'P2-29',
    '1wua14MVSQb2gy5qPt6pKYL6Cc2nSkbBi': 'P2-30',
    '1tHZTVI5ZVLB-yMzxtDSnpCtkoiuMsHZM': 'P2-31',
    '1EuDU9ByEy2E-G8ii0yaJ_nqYxwhp91OF': 'P2-32',
    '1SG3yTFXsc03l81OdOaRmlLmt34YlSUus': 'P2-33',
    '1GTjoRvqiYfFSnwhLuSYk2gfjES3aE3kl': 'P2-34',
    '1uziFt0XPictbchad5zDSTsMavDJqFQiQ': 'P2-35',
    '1LC4IMvPWrFfORxssBwhNy4rNXA2f6I9s': 'P2-36',
    '1PeMBea87iCJkyCX-R2Wz4y2DWvQdw0cs': 'P2-37',
    '1ExMFTTgsONqLYB66w6kS3ZYsTvagz48I': 'P2-38',
    '1bDGn2517HuDJiE2YW9NDo_NsKbCuQCSm': 'P2-39',
    '1TfICw5EoTfW1EwUT-zR_I5CkN--96gmh': 'P2-40',
    '1oi2YSSpHf0mRyXutZ1uBXPylYKjpKmrQ': 'P2-41',
    '1XzaUlZY814kVM2xoDGQjbp7_Eyn4LrTe': 'P2-42',
    '1fg-OMewxBHWLu97tKqxvTlCPAA5C2R7P': 'P2-43',
    '1etCeQf8PToTTDKDcx7kXZ1GElXoJPa1_': 'P2-44',
  });

  // Lux folder
  renameFolder('1U0nsqQ8D0aaNIp214A_NqCVU_ROrEmnl', {
    '13kjREIx3hELPS6FlE3-Qm8UmhiU15LlL': 'L3-01',
    '1atMmX2BN59aHUMYBprG4W6pWLSVkCU3s': 'L3-02',
    '19D1gx_obONaogl06MkfSlegATkg3JSAN': 'L3-03',
    '1r4ZxmZWfG_-HY30P64BLsG3y_eu4OHFd': 'L3-04',
    '1FKPmsC7u8GZ3_HDg_not80JUP8mDeOHW': 'L3-05',
    '1e2W5OgxJa9YZBmYYGRO6Qxz0ZACnvn5c': 'L3-06',
    '1DLfa-dEJPAp_maXFE_q3ePmyCqsMqxBF': 'L3-07',
    '1tETgyLL1Q_ZOBRUfjOJwmIOKLbjLqVyJ': 'L3-08',
    '1q4xcV9w_Omg7SWLPTMpr5-RNr8GOEEei': 'L3-09',
    '1I6rVYeIPmhpi9FdEhIsk8icFc4OOYleV': 'L3-10',
    '1FvqDhihdgPK7bmrgSKFlSMAgic6Z1tR6': 'L3-11',
    '100-esu7kUTLajaZwlsHF5a_HZ0WigxAb': 'L3-12',
    '15dK5xWnAzEfISXTzibuNVXZImLHcfXIE': 'L3-13',
    '1KTmImzIoqZjQDXII_y9HGeMmrkIbTz4V': 'L3-14',
    '1-0B9k_RW-e_xi9MlN1_5pQtlHFJz1sAm': 'L3-15',
    '1_eU6vhnoPA-7PnR2E928BfKvLw0OPzkn': 'L3-16',
    '1C9-poZ1H1Jfhbsce8lmx4wLH9CYMKtJG': 'L3-17',
    '1YyakowNP6nNhOaZhiyegs2HsQIo4fWWO': 'L3-18',
    '1yVZM8CJoQDZ4oMIPu61GFhiMgQtPHZ4S': 'L3-19',
    '1s8vWgKqWZ-6MzWameVQAY5fbDwC-hsDG': 'L3-20',
    '1io9TNlEjYXaN_070xWcTk6xRxOY-3G4o': 'L3-21',
    '1pz_h1b5b4YhIavmpuiMa8ek3Mp6pbOfV': 'L3-22',
    '1qddLniC7zX6dJXkliSLMNBsIUbsd48Xz': 'L3-23',
    '1oUdcvanowaVy8jhrHP05vo6SIRkVra7I': 'L3-24',
    '1Mby_uKMwErQqflN3kKfUfEnNC24rJRPg': 'L3-25',
    '1yLoRZxNc860aHn4z0QEO19LiQRhwAXtw': 'L3-26',
    '11RX-kEKkNozoGukUAmTonC4NwZNQyuw3': 'L3-27',
    '1Narum0KBgwTZSmA5PaqLxoKMdycbYc4w': 'L3-28',
    '190EY9C44g07bv1P1jo4mKLSArqTZk0fh': 'L3-29',
    '1-96TavGQaI6ybbdtJd9SX_mkA7Rv-TBA': 'L3-30',
    '1Nzl4PCuPWGGZjO6xOsvptjK-XtM7_Xkn': 'L3-31',
    '1F5MJlMB7Xy5iusts-dcKgp3r_w6bBdIm': 'L3-32',
    '1HlpfZ_54mcUHM9RmydervIIcSUj5RSC7': 'L3-33',
    '1eLgViFFciaCzxY1HAzvUl_NfOXEswgZy': 'L3-34',
    '1RAeJSJQeKosdlZK3ZS7gAf0c5E8Det-2': 'L3-35',
    '1zp0VDEk0P_hVFWhehnZobHzVmunyrRvp': 'L3-36',
    '1Qk5lSGjIK8Vw74XHCEKafzD7Hd9bJYk2': 'L3-37',
    '10vVlN4l04RlhPvexRiEBxoyRmYlXSeN0': 'L3-38',
    '1OEQrsvrc8yDO9BVhaLjZXZdo-w0wclrY': 'L3-39',
    '1ntCyAQYwXsYY_aKUWKiBvrFPdnIm0Q3z': 'L3-40',
    '1Rx7pKF4uzVMKLwAQm-hMgGasX5pFaphI': 'L3-41',
    '1MWQa6k6Iwafqa7OnEk-BufDJU3zRhQf2': 'L3-42',
    '10N8Na_ywRtSTxe2OzVqmOOxpijJGnT7p': 'L3-43',
    '17d7L5jfp6VlLA9-1T5Wmc2H9DGqW5ZjG': 'L3-44',
    '1fHyQHzMJt2riqzbq7ZaPFrQsRDCtLzEe': 'L3-45',
    '1C5YeKV87JjAikp_RpLGTuVGU42g1cgtU': 'L3-46',
    '1p8OQabBLwkLanMW4EIk1ITxtCyNK7Y5d': 'L3-47',
    '1a6uC1tRDiPCqdCQS04H5BBAWdaKDZ-bX': 'L3-48',
    '1LHG0aXRHQ0MeFkpUtx1rABitjurczMvi': 'L3-49',
    '1R8u86Tj65Lnn5K9SQUqudazfQSr6uSzw': 'L3-50',
    '1gIUO5Fi6NEJpHnBN5CU5AFbebBf2eyag': 'L3-51',
    '1l5eAJdzn8rctJD4YxBDLZc8usXkVRcSd': 'L3-52',
    '1IZWlKodYe0-i2sPSGtZdTJHkJk8WbpBI': 'L3-53',
    '1So1cwRyuMuygigQdlDMfAjdMT1-BiA_7': 'L3-54',
    '1B55dFzo4LzXepjp0asUNZF5ABv4K6Cfl': 'L3-55',
    '1jdTRqcRrB_CTAzYlZCMBXF2EbkYHv0TM': 'L3-56',
    '1FzLqRTBVvBM0oaRcTrsKC72MFxliAHNd': 'L3-57',
    '1o-ICAZdPPlOkRE3qxiUQ3DeEJdermv9f': 'L3-58',
    '1vcycCgq-uBwGv429l6H6XmlMUhwVT4ZB': 'L3-59',
    '13CCHTbtjhlFV_YdohRAgDaeLvPGhVvgW': 'L3-60',
    '15E4uJn8tQzWuuXfUclnsR64xmLpWNBI7': 'L3-61',
    '1OqQYRThTFTxbJUiEPO4zuyfwj8uNYDgO': 'L3-62',
    '1Tlp2dJr6Ds21YJmTGj5mxt2sN9heiPuc': 'L3-63',
    '1W5izGkmONrUh4IsfxvzAEWKmaBkiqJbA': 'L3-64',
    '1y4P6Rd0x2_2bSI0JJ3PWv73NXqc-WJpA': 'L3-65',
    '1uJ55FrDnRBV6b1s5mRbZtyu7VM7Zu7r2': 'L3-66',
    '18bzgUgbvNWOTcdoZTtFp2LoTNBQGoqiq': 'L3-67',
    '1Db8eP7CjRMNTtbwA2vfOr3fdxr2bBHDn': 'L3-68',
    '1SeyNgV8twteDiLwxjJsGq5nAeUFlETNL': 'L3-69',
  });

  Logger.log('All done!');
}

function renameFolder(folderId, idMap) {
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var renamed = 0;

  while (files.hasNext()) {
    var file = files.next();
    var fileId = file.getId();
    if (idMap[fileId]) {
      var ext = file.getName().split('.').pop();
      var newName = idMap[fileId] + '.' + ext;
      file.setName(newName);
      Logger.log('Renamed: ' + fileId + ' -> ' + newName);
      renamed++;
    }
  }

  Logger.log('Folder ' + folderId + ': renamed ' + renamed + ' files');
}
