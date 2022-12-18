if (!browser) var browser = chrome;

const div = document.createElement('div');
const link = document.createElement('a');
const dot = document.createElement('span');
const tweetPathRegex = /\/([a-zA-Z0-9_]+)\/status\/([0-9]+)(\/photo\/[0-9]+)?/gi;

const createHtml = () => {
    div.classList.add('css-1dbjc4n', 'r-1d09ksm', 'r-1471scf', 'r-18u37iz', 'r-1wbh5a2');
    dot.innerText = ' · ';

    link.classList.add(
        'css-4rbku5', 'css-18t94o4', 'css-901oao', 'css-16my406', 'r-1bwzh9t', 'r-1loqt21', 'r-xoduu5', 'r-1q142lx',
        'r-1w6e6rj', 'r-poiln3', 'r-9aw3ui', 'r-bcqeeo', 'r-3s2u2q', 'r-qvutc0'
    );
    link.innerText = 'Loading...';
    link.setAttribute('href', 'https://help.twitter.com/using-twitter/how-to-tweet#source-labels');
    link.setAttribute('target', '_blank');

    link.addEventListener('mouseenter', () => {
        link.className =
            'css-4rbku5 css-18t94o4 css-901oao css-16my406 r-1bwzh9t r-1loqt21 r-xoduu5 r-1q142lx r-1w6e6rj r-poiln3 r-9aw3ui r-bcqeeo r-1ny4l3l r-1ddef8g r-tjvw6i r-3s2u2q r-qvutc0';
    });
    link.addEventListener('mouseleave', () => {
        link.className =
            'css-4rbku5 css-18t94o4 css-901oao css-16my406 r-1bwzh9t r-1loqt21 r-xoduu5 r-1q142lx r-1w6e6rj r-poiln3 r-9aw3ui r-bcqeeo r-3s2u2q r-qvutc0';
    });

    div.appendChild(dot);
    div.appendChild(link);
}

const fetchSource = async (link) => {
    const tweetId = window.location.pathname.split('/')[3];
    await browser.runtime.sendMessage({ action: 'SET_SOURCE', data: { id: tweetId, el: link.className } });
}

const apply = () => {
    const interval = setInterval(() => {
        const el = document.querySelector('.css-901oao.r-1bwzh9t.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-1b7u577.r-bcqeeo.r-qvutc0');
        if (!!el) {
            el.appendChild(div);
            clearInterval(interval);
        }
    }, 500);
    fetchSource(link);
}

setInterval(() => {
    if (!!tweetPathRegex.test(window.location.pathname)) {
        if (
            !document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:nth-child(2)')
        ) {
            createHtml();
            apply();
        }
    }
}, 500);

if (!!tweetPathRegex.test(window.location.pathname)) {
    createHtml();
    apply();
}
