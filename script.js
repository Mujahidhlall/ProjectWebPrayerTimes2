
const city = "Marib";
const country = "Yemen";
const method = 2; 

const apiUrl = ` https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;


fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`فشل في جلب البيانات: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const timings = data.data.timings; 

  
    const prayers = [
      { name: "الفجر", time: timings.Fajr },
      { name: "الظهر", time: timings.Dhuhr },
      { name: "العصر", time: timings.Asr },
      { name: "المغرب", time: timings.Maghrib },
      { name: "العشاء", time: timings.Isha }
    ];

  
    const container = document.getElementById("prayers-container");

 
    prayers.forEach(prayer => {
      const div = document.createElement("div");
      div.className = "prayer";
      div.innerHTML = `
        <h2>${prayer.name}</h2>
        <p>${prayer.time}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error("خطأ في جلب أوقات الصلاة:", error);
    const container = document.getElementById("prayers-container");
    container.innerHTML = "<p>حدث خطأ في تحميل أوقات الصلاة</p>";
  });




function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();




async function getHijriDate() {
    try {
        const response = await fetch('https://api.aladhan.com/v1/gToH');
        const data = await response.json();
        
        if (data.code === 200) {
            const hijri = data.data.hijri;
            const formattedDate = `${hijri.weekday.ar}، ${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`;
            document.getElementById('hijri-date').textContent = formattedDate;
        } else {
            document.getElementById('hijri-date').textContent = "فشل في جلب التاريخ";
        }
    } catch (error) {
        console.error("خطأ في تحميل التاريخ الهجري:", error);
        document.getElementById('hijri-date').textContent = "غير متاح";
    }
}

getHijriDate();