if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');

  document.getElementById('subscribe').onclick = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BB0OfXGeWnzOvq31GMoezlBd3EJ3ZocQlAv3imb1-bbrDwr467lRGCmV9UKr1ZIDTOKrMeXeWziIhNKt8Auee0w'
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
