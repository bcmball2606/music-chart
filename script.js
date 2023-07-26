const chartData = [
  [1,'2','⬆️',2,1,'LADA','TheBiirthdayParty','Trashlab','B4FKCb1W9qg'],
  [2,'4','⬆️',2,2,'happy (?)','Varis','อิสระ','khc9KOKKUZY'],
  [3,'3','-',2,3,'notOKkrubbossX','_less','Sony Music TH','DwNNqPBAPGk'],
  [4,'1','🔻',2,1,'Another Coast Ride','Soft Pine','Sundae Records','_3IamoXnBgY'],
  [5,'7','⬆️',2,5,'ช่อดอกไม้ที่เคยให้ไปเธอยังเก็บไว้รึเปล่า? / Gypsophlla','A lrynn','NAH MOH Music','pKO_WcifcDw'],
  [6,'16','⬆️',2,6,'Tai Tai','Ford Trio','CrazyMonday','r61ezs-tReo'],
  [7,'11','⬆️',2,7,'trynafindyou','Lesssugar','Trashlab','i0GcEfrd1G4'],
  [8,'10','⬆️',2,8,'XOXO','KIKI','อิสระ','SXBEH2mu6zc'],
  [9,'','🔻',1,9,'จะเกิดใหม่ครั้งใด ขอให้เธอได้เป็นขวัญใจ','Youth Brush','',''],
  [10,'5','🔻',2,5,'ฟุ้ง / Foong','rubberstamp','อิสระ','VcmWYP5ZefY'],
  [11,'','🔻',1,11,'THUNDER N LIGHTING','REUB','',''],
  [12,'8','🔻',2,8,'โลกแตก / Apocalypse','nuthkitta','อิสระ','zWF4x8hXgi4'],
  [13,'6','🔻',2,6,'By Your Side','Seveth Of July','MILK BKK!','Om1uafF5aSM'],
  [14,'12','🔻',2,12,'รบกวน / Unstable Relationship','Dept','Smallroom','FVuOrozZm7A'],
  [15,'14','🔻',2,14,'เอาไว้ก่อน / Hold On','CORNBOI','Wayfer Records','QyKd8UZec2M'],
  [16,'','🔻',1,16,'ได้ก็ดี','Morvasu','',''],
  [17,'9','🔻',2,9,'FLOWERS','Tofu','อิสระ','fZeDuzJTRqk'],
  [18,'13','🔻',2,13,'TV Show','Television off','Smallroom','jMtMRyM60Z8'],
  [19,'18','🔻',2,18,'Dear Friends','Plastic Plastic','What The Duck','BJ3vbzcVuCw'],
  [20,'19','🔻',2,19,'Heart Space (11:59 PM)','Cloud Behind','อิสระ','1siFbBudTVU'],
  [21,'15','🔻',2,15,'วันนี้ในตอนนั้น / On This Day','Internet Juice','อิสระ','E3pHCs7zsdY'],
  [22,'17','🔻',2,17,'SEED','Door Plant','อิสระ','TGHchQRLKXc'],
  [23,'20','🔻',2,20,'นัยน์ตา','Cheyada','อิสระ','3iPnjJrsb7s'],
  
  


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
