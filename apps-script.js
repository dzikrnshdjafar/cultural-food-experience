function doPost(e) {
  // Ganti Ganti dengan ID Spreadsheet Anda (lihat URL Spreadsheet)
  // Contoh: https://docs.google.com/spreadsheets/d/1ABC123xyz_ID_DISINI/edit
  var sheetId = '1umqkildmrdPAQYXq-ncK6Rr2oXEOyfLTaebAoEXoRFg'; 
  
  try {
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    
    // Mengambil data dari request form yang dikirimkan oleh web
    var nama = e.parameter.nama;
    var menu = e.parameter.menu;
    var timestamp = new Date();
    
    // Menentukan baris selanjutnya untuk diisi. 
    // Memastikan data masuk minimal di baris ke-2 (baris 1 bisa digunakan untuk Header)
    var lastRow = sheet.getLastRow();
    var nextRow = lastRow < 1 ? 2 : lastRow + 1; 
    
    // Memasukkan data ke baris yang sudah ditentukan (Kolom A, B, C)
    sheet.getRange(nextRow, 1, 1, 3).setValues([[timestamp, nama, menu]]);
    
    // Mengembalikan response sukses
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Mengembalikan response error jika terjadi masalah
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Method GET tidak didukung, gunakan POST.");
}
