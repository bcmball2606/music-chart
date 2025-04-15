// --- V V V ใส่ URL .csv ของคุณที่ได้จากการ Publish to web ตรงนี้ V V V ---
const googleSheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQghejZeHEbNaYUr2lstIvCsbFWnaPTLXjUIsHcCQVcBmwaPLatAuUA-n58r6Rj5PFDrhKEYv7t-_9n/pub?output=csv'; // <--- URL ที่ถูกต้องของคุณ
// --- ^ ^ ^ ใส่ URL .csv ของคุณที่ได้จากการ Publish to web ตรงนี้ ^ ^ ^ ---

const leftColumn = document.getElementById('left-column');
const rightColumn = document.getElementById('right-column');
const playersPerColumn = 6; // จำนวนผู้เล่นต่อคอลัมน์

async function fetchAndDisplayLeaderboard() {
    if (!googleSheetUrl || googleSheetUrl.includes('<<<')) { // ตรวจสอบว่าใส่ URL ถูกต้องหรือไม่
        console.error("กรุณาใส่ URL ของ Google Sheet CSV ที่ถูกต้องที่ได้จากการ 'Publish to web' ในไฟล์ script.js");
        leftColumn.innerHTML = '<p style="color:red;">ผิดพลาด: กรุณาใส่ URL จาก Publish to web (CSV) ใน script.js</p>';
        rightColumn.innerHTML = '';
        return;
    }

    try {
        // เพิ่ม timestamp ป้องกัน cache
        const urlWithCacheBust = googleSheetUrl + '&cb=' + new Date().getTime();
        const response = await fetch(urlWithCacheBust);

        if (!response.ok) {
            // ลองตรวจสอบว่าอาจจะเป็นปัญหา CORS ถ้าทดสอบแบบ local file (file://)
             if (window.location.protocol === 'file:') {
                 console.error("การดึงข้อมูลจาก file:// อาจถูก CORS บล็อก ลองโฮสต์ไฟล์บนเว็บเซิร์ฟเวอร์ (เช่น Netlify, GitHub Pages) หรือใช้ Live Server extension ใน VS Code");
                 leftColumn.innerHTML = `<p style="color:orange;">CORS Error? ลองโฮสต์ไฟล์บนเว็บ หรือใช้ Live Server.</p>`;
             } else {
                 throw new Error(`HTTP error! status: ${response.status}`);
             }
             return; // หยุดการทำงานถ้ามี Error
        }


        const csvData = await response.text();
        const rows = csvData.split('\n').filter((row, index) => row.trim() !== ''); // แยกบรรทัด, กรองบรรทัดว่าง, *** และข้ามบรรทัดแรก (Header) ***

        // ล้างข้อมูลเก่าก่อนแสดงผลใหม่
        leftColumn.innerHTML = '';
        rightColumn.innerHTML = '';

        // *** เพิ่มการตรวจสอบ: ถ้าไม่มีข้อมูลเลย (หลังจากข้าม Header) ***
        if (rows.length === 0) {
             leftColumn.innerHTML = '<p style="color:orange;">ไม่พบข้อมูลผู้เล่นใน Google Sheet (ตรวจสอบว่ามีข้อมูลหลัง Header หรือไม่)</p>';
             return;
        }

        rows.forEach((rowCsv, index) => {
            // *** เพิ่มการป้องกัน: ถ้าแถวข้อมูลไม่สมบูรณ์ ***
            if (!rowCsv) return;

            const columns = rowCsv.split(','); // แยกคอลัมน์

             // *** เพิ่มการตรวจสอบ: ถ้าข้อมูลคอลัมน์ไม่ครบ ***
             // ปรับเป็น columns.length < 6 หาก Sheet คุณมี 6 คอลัมน์ข้อมูลจริงๆ (ไม่รวม Header)
             if (columns.length < 6) {
                 console.warn(`แถวข้อมูลที่ ${index + 1} (ไม่นับ Header) มีข้อมูลไม่ครบ ${columns.length} คอลัมน์, ข้ามแถวนี้: ${rowCsv}`);
                 return; // ข้ามแถวนี้ไปเลยถ้าข้อมูลไม่ครบ
             }

            // ดึงข้อมูล (ปรับเลข index [0], [1], ... ให้ตรงกับคอลัมน์ใน Sheet ของคุณ)
            // คาดว่าคอลัมน์ใน Sheet คือ: A=Rank, B=Name, C=Played, D=Wins, E=PlusMinus, F=Points
            const rank = columns[0]?.trim() || '?';
            const name = columns[1]?.trim() || 'N/A';
            const played = columns[2]?.trim() || '-';
            const wins = columns[3]?.trim() || '-';
            const plusMinus = columns[4]?.trim() || '+0';
            const points = columns[5]?.trim() || '0';

            // สร้าง HTML สำหรับแถวผู้เล่น
            const playerRowHtml = `
                <div class="player-row">
                    <span class="player-rank">${rank}</span>
                    <span class="player-name">${name}</span>
                    <span class="player-played">${played}</span>
                    <span class="player-wins">${wins}</span>
                    <span class="player-plusminus">${plusMinus}</span>
                    <span class="player-points">${points}</span>
                </div>
            `;

            // เลือกว่าจะใส่ในคอลัมน์ซ้ายหรือขวา (index เริ่มจาก 0 สำหรับข้อมูลแถวแรกหลัง Header)
            if (index < playersPerColumn) {
                leftColumn.innerHTML += playerRowHtml;
            } else if (index < playersPerColumn * 2) { // แสดงแค่ 12 อันดับแรก (ปรับได้)
                rightColumn.innerHTML += playerRowHtml;
            }
        });

        console.log('Leaderboard updated:', new Date().toLocaleTimeString());

    } catch (error) {
        console.error('Error fetching or processing leaderboard data:', error);
        // แสดงข้อความ Error ที่ชัดเจนขึ้น
        leftColumn.innerHTML = `<p style="color:orange;">Error loading data. อาจเกิดจาก URL ผิด, Sheet ไม่ได้ Publish, Network มีปัญหา, หรือรูปแบบข้อมูลใน Sheet ไม่ถูกต้อง (ดู Console F12).</p>`;
        rightColumn.innerHTML = '';
    }
}

// --- การอัปเดต ---
// เรียกใช้ครั้งแรก
fetchAndDisplayLeaderboard();

// ตั้งเวลาให้ดึงข้อมูลใหม่ทุกๆ 10 วินาที (10000 ms)
// คุณอาจปรับเวลาให้น้อยลงได้ถ้าต้องการอัปเดตเร็วขึ้น เช่น 5000 (5 วินาที)
setInterval(fetchAndDisplayLeaderboard, 10000);
