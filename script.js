// --- V V V ตรวจสอบว่า URL ถูกต้องและได้จาก Publish to web แบบ CSV V V V ---
const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQghejZeHEbNaYUr2lstIvCsbFWnaPTLXjUIsHcCQVcBmwaPLatAuUA-n58r6Rj5PFDrhKEYv7t-_9n/pub?output=csv'; // <<-- ใส่ URL .csv ของคุณตรงนี้
// --- ^ ^ ^ ตรวจสอบว่า URL ถูกต้องและได้จาก Publish to web แบบ CSV ^ ^ ^ ---

const leftColumn = document.getElementById('left-column');
const rightColumn = document.getElementById('right-column');
const playersPerColumn = 6; // จำนวนผู้เล่นต่อคอลัมน์ (6 คนต่อฝั่ง = 12 คนแรก)

// --- ฟังก์ชันหลักในการดึงและแสดงข้อมูล ---
async function fetchAndDisplayLeaderboard() {
    // ตรวจสอบว่าใส่ URL ถูกต้องหรือไม่
    if (!googleSheetUrl || !googleSheetUrl.includes('output=csv')) {
        console.error("Error: กรุณาใส่ URL ของ Google Sheet CSV ที่ถูกต้อง (ได้จากการ 'Publish to web') ในไฟล์ script.js");
        leftColumn.innerHTML = '<p style="color:red;">ผิดพลาด: URL ใน script.js ไม่ถูกต้อง (ต้องเป็น CSV จาก Publish to web)</p>';
        rightColumn.innerHTML = '';
        return;
    }

    try {
        // เพิ่ม timestamp ป้องกัน cache ของ browser/network
        const urlWithCacheBust = googleSheetUrl + '&cb=' + new Date().getTime();
        const response = await fetch(urlWithCacheBust);

        // ตรวจสอบว่า fetch สำเร็จหรือไม่
        if (!response.ok) {
             // จัดการข้อผิดพลาดในการ fetch (เช่น Network error, 404 Not Found)
             if (window.location.protocol === 'file:') {
                 console.error("CORS Error: การดึงข้อมูลจาก file:// อาจถูกบล็อก ลองโฮสต์ไฟล์บนเว็บเซิร์ฟเวอร์ (Netlify, GitHub Pages) หรือใช้ Live Server extension ใน VS Code");
                 leftColumn.innerHTML = `<p style="color:orange;">CORS Error? ลองโฮสต์ไฟล์บนเว็บ หรือใช้ Live Server.</p>`;
             } else {
                  console.error(`HTTP error! status: ${response.status}`);
                 leftColumn.innerHTML = `<p style="color:orange;">HTTP Error ${response.status}. ไม่สามารถโหลดข้อมูลได้ (URL อาจผิด, Sheet ไม่ได้ Publish?)</p>`;
             }
             rightColumn.innerHTML = '';
             return; // หยุดการทำงานถ้ามี Error
        }

        // อ่านข้อมูล CSV เป็น Text
        const csvData = await response.text();
        // แยกบรรทัด, กรองบรรทัดว่าง, และข้ามบรรทัดแรก (Header Row)
        // *** ถ้า Sheet ของคุณไม่มี Header Row ให้ลบ "&& index > 0" ออก ***
        const rows = csvData.split('\n').filter((row, index) => row.trim() !== '');

        // ล้างข้อมูลเก่าในคอลัมน์ก่อนแสดงผลใหม่
        leftColumn.innerHTML = '';
        rightColumn.innerHTML = '';

        // ตรวจสอบว่ามีข้อมูลผู้เล่นหรือไม่ (หลังจากกรองและข้าม Header)
        if (rows.length === 0) {
             console.warn('ไม่พบข้อมูลผู้เล่นใน Google Sheet (หลังจากข้าม Header).');
             leftColumn.innerHTML = '<p style="color:orange;">ไม่พบข้อมูลผู้เล่น.</p>';
             return;
        }

        // --- วนลูปสร้าง HTML สำหรับผู้เล่นแต่ละคน ---
        rows.forEach((rowCsv, index) => {
            // ตรวจสอบข้อมูลแถวเบื้องต้น
            if (!rowCsv) return;

            const columns = rowCsv.split(','); // แยกข้อมูลด้วยคอมม่า

            // ตรวจสอบว่ามีข้อมูลครบตามจำนวนคอลัมน์ที่คาดหวัง (6 คอลัมน์)
             if (columns.length < 6) {
                 console.warn(`แถวข้อมูลที่ ${index + 1} (ไม่นับ Header) มีข้อมูลไม่ครบ ${columns.length} คอลัมน์, ข้ามแถวนี้: ${rowCsv}`);
                 return; // ข้ามแถวนี้ถ้าข้อมูลไม่ครบ
             }

            // --- ดึงข้อมูลจากแต่ละคอลัมน์ ---
            // คาดว่าคอลัมน์ใน Sheet คือ: A=Rank, B=Name, C=Played, D=Wins, E=PlusMinus, F=Points
            const rankStr = columns[0]?.trim() || '?';        // เก็บ Rank เป็น String ไว้แสดงผล
            const name = columns[1]?.trim() || 'N/A';         // ชื่อ
            const played = columns[2]?.trim() || '-';         // Played
            const wins = columns[3]?.trim() || '-';           // Wins
            const plusMinus = columns[4]?.trim() || '+0';     // +/-
            const points = columns[5]?.trim() || '0';         // Points

            // --- กำหนด CSS Class สำหรับสีของ Rank ---
            let rankColorClass = ''; // ค่าเริ่มต้น: ไม่มี Class สีพิเศษ
            const rankNum = parseInt(rankStr, 10); // แปลง Rank เป็นตัวเลข

            if (!isNaN(rankNum)) { // ถ้าแปลงเป็นตัวเลขได้สำเร็จ
                if (rankNum >= 1 && rankNum <= 4) {
                    rankColorClass = 'rank-blue'; // อันดับ 1-4: สีฟ้า
                } else if (rankNum >= 5 && rankNum <= 8) {
                    rankColorClass = 'rank-green'; // อันดับ 5-8: สีเขียว
                } else if (rankNum >= 9 && rankNum <= 12) {
                    rankColorClass = 'rank-red'; // อันดับ 9-12: สีแดง
                }
                // อันดับอื่นๆ หรือที่ไม่ใช่ตัวเลข จะไม่มี Class สีพิเศษ (ใช้สี default)
            }

            // --- สร้าง Element HTML สำหรับแถวผู้เล่น ---
            // ใช้ Template Literals (backticks ``) เพื่อสร้าง HTML ง่ายขึ้น
            // เพิ่ม ${rankColorClass} ใน class ของ player-rank
            const playerRowHtml = `
                <div class="player-row">
                    <span class="player-rank ${rankColorClass}">${rankStr}</span>
                    <span class="player-name">${name}</span>
                    <span class="player-played">${played}</span>
                    <span class="player-wins">${wins}</span>
                    <span class="player-plusminus">${plusMinus}</span>
                    <span class="player-points">${points}</span>
                </div>
            `;

            // --- นำ HTML ที่สร้างไปใส่ในคอลัมน์ที่ถูกต้อง ---
            // index เริ่มจาก 0 สำหรับข้อมูลแถวแรกหลัง Header
            if (index < playersPerColumn) {
                // ผู้เล่นคนที่ 1-6 (index 0-5) ใส่คอลัมน์ซ้าย
                leftColumn.innerHTML += playerRowHtml;
            } else if (index < playersPerColumn * 2) {
                // ผู้เล่นคนที่ 7-12 (index 6-11) ใส่คอลัมน์ขวา
                rightColumn.innerHTML += playerRowHtml;
            }
            // ถ้ามีผู้เล่นมากกว่า 12 คน จะไม่แสดงผล (ปรับแก้ได้ถ้าต้องการ)
        });

        console.log('Leaderboard updated successfully at:', new Date().toLocaleTimeString());

    } catch (error) {
        // จัดการข้อผิดพลาดที่ไม่คาดคิดระหว่างการประมวลผล
        console.error('Error fetching or processing leaderboard data:', error);
        leftColumn.innerHTML = `<p style="color:red;">เกิดข้อผิดพลาดในการแสดงผล. (${error.message})</p>`;
        rightColumn.innerHTML = '';
    }
}

// --- ส่วนการทำงานเมื่อโหลดหน้าเว็บ ---

// เรียกใช้ฟังก์ชันเพื่อโหลดข้อมูลครั้งแรกทันทีที่หน้าเว็บพร้อม
fetchAndDisplayLeaderboard();

// --- ตั้งเวลาให้ดึงข้อมูลใหม่เป็นระยะ ---
// ค่าเป็น milliseconds (1000ms = 1 วินาที)
// แนะนำ: 30000 (30 วินาที) หรือ 60000 (1 นาที) เพื่อลดปัญหาสลับข้อมูลเก่า/ใหม่
// ปรับค่าตามความต้องการและความเร็วในการอัปเดตของ Google Sheet Publish
const updateInterval = 30000; // <-- ปรับเวลาตรงนี้ (หน่วยเป็น ms)
setInterval(fetchAndDisplayLeaderboard, updateInterval);

console.log(`Leaderboard will auto-update every ${updateInterval / 1000} seconds.`);