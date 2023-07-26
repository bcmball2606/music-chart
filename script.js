const chartData = [
    [1,'N','⬆️',1,1,'Another Coast Ride','Soft Pine','Sundae Records','_3IamoXnBgY'],
[2,'N','⬆️',1,2,'LADA','The Biirthday Party','Trashlab','B4FKCb1W9qg'],
[3,'N','⬆️',1,3,'notOKkrubbossX','_less','Sony Music TH','DwNNqPBAPGk'],
[4,'N','⬆️',1,4,'happy (?)','Varis','อิสระ','khc9KOKKUZY'],
[5,'N','⬆️',1,5,'ฟุ้ง / Foong','rubberstamp','อิสระ','VcmWYP5ZefY'],
[6,'N','⬆️',1,6,'By Your Side','Seveth Of July','MILK BKK!','Om1uafF5aSM'],
[7,'N','⬆️',1,7,'ช่อดอกไม้ที่เคยให้ไปเธอยังเก็บไว้รึเปล่า? / Gypsophlla','A lrynn','NAH MOH Music','pKO_WcifcDw'],
[8,'N','⬆️',1,8,'โลกแตก / Apocalypse','nuthkitta','อิสระ','zWF4x8hXgi4'],
[9,'N','⬆️',1,9,'FLOWERS','Tofu','อิสระ','fZeDuzJTRqk'],
[10,'N','⬆️',1,10,'XOXO','KIKI','อิสระ','SXBEH2mu6zc'],
[11,'N','⬆️',1,11,'trynafindyou','Lesssugar','Trashlab','i0GcEfrd1G4'],
[12,'N','⬆️',1,12,'รบกวน / Unstable Relationship','Dept','Smallroom','FVuOrozZm7A'],
[13,'N','⬆️',1,13,'TV Show','Television off','Smallroom','jMtMRyM60Z8'],
[14,'N','⬆️',1,14,'เอาไว้ก่อน / Hold On','CORNBOI','Wayfer Records','QyKd8UZec2M'],
[15,'N','⬆️',1,15,'วันนี้ในตอนนั้น / On This Day','Internet Juice','อิสระ','E3pHCs7zsdY'],
[16,'N','⬆️',1,16,'Tai Tai','Ford Trio','CrazyMonday','r61ezs-tReo'],
[17,'N','⬆️',1,17,'SEED','Door Plant','อิสระ','TGHchQRLKXc'],
[18,'N','⬆️',1,18,'Dear Friends','Plastic Plastic','What The Duck','BJ3vbzcVuCw'],
[19,'N','⬆️',1,19,'Heart Space (11:59 PM)','Cloud Behind','อิสระ','1siFbBudTVU'],
[20,'N','⬆️',1,20,'นัยน์ตา','Cheyada','อิสระ','3iPnjJrsb7s'],
[21,'','',,,'Start in Weeks 12 / 2023','','',''],
[22,'','',,,'Start in Weeks 12 / 2023','','',''],
[23,'','',,,'Start in Weeks 12 / 2023','','',''],
[24,'','',,,'Start in Weeks 12 / 2023','','',''],
[25,'','',,,'Start in Weeks 12 / 2023','','',''],
[26,'','',,,'Start in Weeks 12 / 2023','','',''],
[27,'','',,,'Start in Weeks 12 / 2023','','',''],
[28,'','',,,'Start in Weeks 12 / 2023','','',''],
[29,'','',,,'Start in Weeks 12 / 2023','','',''],
[30,'','',,,'Start in Weeks 12 / 2023','','',''],


    // Add more rows for the rest of the chart data with corresponding YouTube links
  ];

  // Function to populate the table with chart data
function populateChart() {
    const tableBody = document.querySelector('tbody');
    let html = '';
    for (const row of chartData) {
      html += '<tr>';
      for (let i = 0; i < row.length; i++) {
        if (i === row.length - 1) {
          // Get the YouTube link from the last element of the row
          const youtubeLink = row[i];
          html += `<td><a href="https://www.youtube.com/watch?v=${youtubeLink}" target="_blank">Listen</a></td>`;
        } else {
          html += `<td>${row[i]}</td>`;
        }
      }
      html += '</tr>';
    }
    tableBody.innerHTML = html;
  }
  
  document.addEventListener('DOMContentLoaded', populateChart);
