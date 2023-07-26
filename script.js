const chartData = [
  [1,'11','⬆️',2,1,'Another Coast Ride [No.1 : 1wk]','Soft Pine','Sundae Records','_3IamoXnBgY'],
[2,'9','⬆️',4,2,'LADA','TheBiirthdayParty','Trashlab','B4FKCb1W9qg'],
[3,'1','⬇️',3,1,'notOKkrubbossX [No.1 : 1wk]','_less','Sony Music TH','DwNNqPBAPGk'],
[4,'4','-',3,4,'happy (?)','Varis','อิสระ','khc9KOKKUZY'],
[5,'2','⬇️',4,1,'ฟุ้ง / Foong [No.1 : 1wk]','rubberstamp','อิสระ','VcmWYP5ZefY'],
[6,'3','⬇️',11,1,'By Your Side [No.1 : 1wk]','Seveth Of July','MILK BKK!','Om1uafF5aSM'],
[7,'7','-',6,7,'ช่อดอกไม้ที่เคยให้ไปเธอยังเก็บไว้รึเปล่า? / Gypsophlla','A lrynn','NAH MOH Music','pKO_WcifcDw'],
[8,'8','-',4,8,'โลกแตก / Apocalypse','nuthkitta','อิสระ','zWF4x8hXgi4'],
[9,'6','⬇️',10,1,'FLOWERS [No.1 : 1wk]','Tofu','อิสระ','fZeDuzJTRqk'],
[10,'5','⬇️',9,3,'XOXO','KIKI','อิสระ','SXBEH2mu6zc'],
[11,'N','⬆️',1,11,'trynafindyou','Lesssugär','Trashlab','i0GcEfrd1G4'],
[12,'12','-',4,12,'รบกวน / Unstable Relationship','Dept','Smallroom','FVuOrozZm7A'],
[13,'13','-',3,13,'TV Show','Television off','Smallroom','jMtMRyM60Z8'],
[14,'10','⬇️',9,1,'เอาไว้ก่อน / Hold On [No.1 : 2wks]','CORNBOI','Wayfer Records','QyKd8UZec2M'],
[15,'14','⬇️',11,1,'วันนี้ในตอนนั้น / On This Day [No.1 : 2wks]','Internet Juice','อิสระ','E3pHCs7zsdY'],
[16,'N','⬆️',1,6,'Tai Tai','Ford Trio','CrazyMonday','r61ezs-tReo'],
[17,'15','⬇️',16,1,'SEED [No.1 : 3wks]','Door Plant','อิสระ','TGHchQRLKXc'],
[18,'18','-',3,14,'Dear Friends','Plastic Plastic','What The Duck','BJ3vbzcVuCw'],
[19,'16','⬇️',5,19,'Heart Space (11:59 PM)','Cloud Behind','อิสระ','1siFbBudTVU'],
[20,'17','⬇️',4,17,'นัยน์ตา','Cheyada','อิสระ','3iPnjJrsb7s'],

  


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
