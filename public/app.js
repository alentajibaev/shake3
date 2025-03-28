
document.getElementById("notify-btn").addEventListener("click", async () => {
  if ("Notification" in window && navigator.serviceWorker) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const reg = await navigator.serviceWorker.register("/sw.js");
      reg.showNotification("Уведомления включены!", {
        body: "Теперь вы будете получать оповещения.",
        icon: "/icon.png"
      });
    }
  }
});
