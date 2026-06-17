// ฟังก์ชันจัดการการเปิด/ซ่อนหน้าแบบ Single Page Application (SPA)
function navigateTo(screenId) {
    // ซ่อนทุกหน้าจอที่มีคลาสสลับหน้า
    document.querySelectorAll('.spa-screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    // แสดงเฉพาะหน้าจอที่ถูกคลิกเรียก ID
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // อัปเดตสีปุ่มของแถบเมนูด้านล่างให้ Active ตามหน้าจริง
    updateBottomNavState(screenId);
}

function updateBottomNavState(screenId) {
    const navButtons = document.querySelectorAll('#global-bottom-nav button');
    if (!navButtons.length) return;

    navButtons.forEach(btn => {
        btn.classList.remove('text-[#10b981]');
        btn.classList.add('text-gray-400');
    });

    if (screenId === 'screen-home') navButtons[0].classList.replace('text-gray-400', 'text-[#10b981]');
    if (screenId === 'screen-stall-detail') navButtons[1].classList.replace('text-gray-400', 'text-[#10b981]');
    if (screenId === 'screen-vendor-dashboard') navButtons[2].classList.replace('text-gray-400', 'text-[#10b981]');
}

// ฟังก์ชันจำลองตารางบล็อกแผงค้า 36 บล็อก ลงในโครงสร้างหน้าจอ
function renderStallGrid() {
    const container = document.getElementById('stalls-container');
    if (!container) return;
    
    container.innerHTML = ""; // ล้างข้อมูลขยะเก่าก่อนเริ่มทำงาน

    // วนลูปสร้างปุ่มบล็อกจำนวน 1 ถึง 36 บล็อกแบบไดนามิก
    for (let i = 1; i <= 36; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        
        // กำหนดสถานะล็อกจองแล้วแบบสุ่ม หรือตามตัวเลขที่กำหนดเพื่อให้สมจริง
        const isOccupied = [4, 6, 10, 11, 16, 17, 22, 23, 29, 30].includes(i);
        
        if (isOccupied) {
            button.className = "aspect-square bg-[#2f3632] text-gray-600 text-xs rounded-lg flex items-center justify-center cursor-not-allowed";
            button.disabled = true;
        } else {
            button.className = "aspect-square bg-[#10b981] text-black text-xs font-bold rounded-lg flex items-center justify-center transition-all active:scale-90 hover:bg-[#ffc640] focus:bg-[#ffc640] focus:text-black";
            button.addEventListener('click', () => selectStall(i, 350));
        }
        
        container.appendChild(button);
    }
}

// ฟังก์ชันเมื่อคลิกเลือกบล็อกแผงค้าในตาราง
function selectStall(stallId, price) {
    const infoCard = document.getElementById('selected-stall-card');
    const displayId = document.getElementById('display-stall-id');
    
    if (displayId && infoCard) {
        displayId.textContent = `แผง #${stallId.toString().padStart(2, '0')}`;
        infoCard.classList.remove('hidden');
    }
}

// ผูกฟังก์ชันแท็บสลับฟอร์มล็อกอิน/สมัครสมาชิก
document.addEventListener('DOMContentLoaded', () => {
    renderStallGrid(); // สั่งให้วาดตาราง 36 บล็อกทันทีเมื่อหน้าเว็บโหลดเสร็จ
    
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.className = "flex-1 pb-2 text-[#10b981] border-b-2 border-[#10b981]";
            tabRegister.className = "flex-1 pb-2 text-gray-400";
            formLogin.classList.remove('hidden');
            formRegister.classList.add('hidden');
        });

        tabRegister.addEventListener('click', () => {
            tabRegister.className = "flex-1 pb-2 text-[#ffc640] border-b-2 border-[#ffc640]";
            tabLogin.className = "flex-1 pb-2 text-gray-400";
            formRegister.classList.remove('hidden');
            formLogin.classList.add('hidden');
        });
    }
});