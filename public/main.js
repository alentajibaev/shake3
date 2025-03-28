if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');

  document.getElementById('subscribe').onclick = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'ВАШ_ПУБЛИЧНЫЙ_КЛЮЧ_ВСТАВИТЬ_СЮДА_ЖЕСТКО'
    });

    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    alert('Subscribed!');
  };
}
