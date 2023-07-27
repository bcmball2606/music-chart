const chartData = [
  [1,'2','⬆️',5,1,'LADA [No.1 : 1wk]','TheBiirthdayParty','Trashlab','B4FKCb1W9qg'],
[2,'4','⬆️',4,2,'happy (?)','Varis','อิสระ','khc9KOKKUZY'],
[3,'3','-',4,1,'notOKkrubbossX [No.1 : 1wk]','_less','Sony Music TH','DwNNqPBAPGk'],
[4,'1','⬇️',3,1,'Another Coast Ride [No.1 : 1wk]','Soft Pine','Sundae Records','_3IamoXnBgY'],
[5,'7','⬆️',7,5,'ช่อดอกไม้ที่เคยให้ไปเธอยังเก็บไว้รึเปล่า? / Gypsophlla','A lrynn','NAH MOH Music','pKO_WcifcDw'],
[6,'16','⬆️',2,6,'Tai Tai','Ford Trio','CrazyMonday','r61ezs-tReo'],
[7,'11','⬆️',2,7,'trynafindyou','Lesssugär','Trashlab','i0GcEfrd1G4'],
[8,'10','⬆️',10,3,'XOXO','KIKI','Parinam Music','SXBEH2mu6zc'],
[9,'N','⬆️',1,9,'จะเกิดใหม่ครั้งใด ขอให้เธอได้เป็นขวัญใจ','Youth Brush','อิสระ','azVCm-lyXMM'],
[10,'5','⬇️',5,1,'ฟุ้ง / Foong [No.1 : 1wk]','rubberstamp','อิสระ','VcmWYP5ZefY'],
[11,'N','⬆️',1,11,'THUNDER N LIGHTING','REUB','GUESSWHAT!?','WZPwyzUzapw'],
[12,'8','⬇️',5,8,'โลกแตก / Apocalypse','nuthkitta','อิสระ','zWF4x8hXgi4'],
[13,'6','⬇️',12,1,'By Your Side [No.1 : 1wk]','Seveth Of July','MILK BKK!','Om1uafF5aSM'],
[14,'12','⬇️',5,12,'รบกวน / Unstable Relationship','Dept','Smallroom','FVuOrozZm7A'],
[15,'14','⬇️',10,1,'เอาไว้ก่อน / Hold On [No.1 : 2wks]','CORNBOI','Wayfer Records','QyKd8UZec2M'],
[16,'N','⬆️',1,16,'ได้ก็ดี','Morvasu','What The Duck','HMKtIPumqlw'],
[17,'9','⬇️',11,1,'FLOWERS [No.1 : 1wk]','Tofu','อิสระ','fZeDuzJTRqk'],
[18,'13','⬇️',4,13,'TV Show','Television off','Smallroom','jMtMRyM60Z8'],
[19,'18','⬇️',4,14,'Dear Friends','Plastic Plastic','What The Duck','BJ3vbzcVuCw'],
[20,'19','⬇️',6,19,'Heart Space (11:59 PM)','Cloud Behind','อิสระ','1siFbBudTVU'],

  
  

  


   
  ];

  
function populateChart() {
    const tableBody = document.querySelector('tbody');
    let html = '';
    for (const row of chartData) {
      html += '<tr>';
      for (let i = 0; i < row.length; i++) {
        if (i === row.length - 1) {
          
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
