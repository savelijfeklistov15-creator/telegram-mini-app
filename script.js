let tg = window.Telegram.WebApp;

tg.ready();

function buy(link) {
    tg.openLink(link);
}