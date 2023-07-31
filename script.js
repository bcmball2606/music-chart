const chartData = [
  [1,'2','⬆️',5,1,'happy (?) [No.1 : 1wk]','Varis','อิสระ','khc9KOKKUZY'],
  [2,'5','⬆️',8,2,'ช่อดอกไม้ที่เคยให้ไปเธอยังเก็บไว้รึเปล่า? / Gypsophlla','A lrynn','NAH MOH Music','pKO_WcifcDw'],
  [3,'9','⬆️',2,3,'จะเกิดใหม่ครั้งใด ขอให้เธอได้เป็นขวัญใจ','Youth Brush','อิสระ','azVCm-lyXMM'],
  [4,'3','⬇️',5,1,'notOKkrubbossX [No.1 : 1wk]','_less','Sony Music TH','DwNNqPBAPGk'],
  [5,'1','⬇️',6,1,'LADA [No.1 : 1wk]','TheBiirthdayParty','Trashlab','B4FKCb1W9qg'],
  [6,'6','-',3,6,'Tai Tai','Ford Trio','CrazyMonday','r61ezs-tReo'],
  [7,'7','-',3,7,'trynafindyou','Lesssugär','Trashlab','i0GcEfrd1G4'],
  [8,'N','⬆️',1,8,'ห่างกันไว้ / Over Space','Story And Feel.','อิสระ','1yKwAxmJh4Y'],
  [9,'4','⬇️',4,1,'Another Coast Ride [No.1 : 1wk]','Soft Pine','Sundae Records','_3IamoXnBgY'],
  [10,'11','⬆️',2,10,'THUNDER N LIGHTING','REUB','GUESSWHAT!?','WZPwyzUzapw'],
  [11,'20','⬆️',7,11,'Heart Space (11:59 PM)','Cloud Behind','อิสระ','1siFbBudTVU'],
  [12,'N','⬆️',1,16,'Come Around','wadfah','Smallroom','OND1JnbsOac'],
  [13,'18','⬆️',5,13,'TV Show','Television off','Smallroom','jMtMRyM60Z8'],
  [14,'14','-',6,14,'รบกวน / Unstable Relationship','Dept','Smallroom','FVuOrozZm7A'],
  [15,'N','⬆️',1,20,'ในวันเกิดฉันจะขอ','Soulfear','อิสระ','VYTm_72Cg9o'],
  [16,'16','-',2,16,'ได้ก็ดี','Morvasu','What The Duck','HMKtIPumqlw'],
  [17,'19','⬆️',5,14,'Dear Friends','Plastic Plastic','What The Duck','BJ3vbzcVuCw'],
  [18,'10','⬇️',6,1,'ฟุ้ง / Foong [No.1 : 1wk]','rubberstamp','อิสระ','VcmWYP5ZefY'],
  [19,'N','⬆️',1,19,'Finder','Seventh Of July','MILK BKK!','Qn1JSkaQxec'],
  [20,'12','⬇️',6,8,'โลกแตก / Apocalypse','nuthkitta','อิสระ','zWF4x8hXgi4'],
  
  

  
  

  


   
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
