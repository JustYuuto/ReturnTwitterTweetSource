if (!browser) var browser = chrome;

browser.runtime.onMessage.addListener(async (message) => {
    if (message.action === 'SET_SOURCE') {
        const req = await fetch(`https://api.twitter.com/1.1/statuses/show/${message.data.id}.json`, {
            headers: {
                Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAGjvjwEAAAAA77GRcScylEupYSRdR229YWeba1Q%3DGgg1oobkcjxVsgcxNnLbmxikefkN1AX5LRToR0U3u9EqF1wB5c'
            }
        });

        const handleCallback = (code) => {
            const interval = setInterval(() => {
                browser.tabs.executeScript({ code }, (result) => {
                    return !!result[0] && clearInterval(interval);
                });
            }, 500);
        }

        if (req.ok) {
            const json = await req.json();
            const parser = new DOMParser();
            const sourceLink = parser.parseFromString(json.source, 'text/html');
            const source = sourceLink.querySelector('a').innerText;
            handleCallback(`
            (() => {
                if (
                    document.querySelector('.css-901oao.r-1bwzh9t.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-1b7u577.r-bcqeeo.r-qvutc0')?.childElementCount >= 2 &&
                    !!document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}')
                ) {
                    if (!browser) var browser = chrome;
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').innerText = '${source.replaceAll("'", '&quot;')}';
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').setAttribute('aria-label', '${source.replaceAll("'", '&quot;')}');
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').setAttribute('title', '${source.replaceAll("'", '&quot;')}');
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').setAttribute('role', 'link');
                    return true;
                } else { return false; }
            })();
            `);
        } else {
            handleCallback(`
            (() => {
                if (
                    document.querySelector('.css-901oao.r-1bwzh9t.r-37j5jr.r-a023e6.r-16dba41.r-rjixqe.r-1b7u577.r-bcqeeo.r-qvutc0')?.childElementCount >= 2 &&
                    !!document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}')
                ) {
                    if (!browser) var browser = chrome;
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').innerHTML = '<span style="color: red;">An error occured while loading source (click for more info)</span>';
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').setAttribute('aria-label', 'Cannot get protected tweets and Twitter circle tweets status due to the API');
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').setAttribute('title', 'Cannot get protected tweets and Twitter circle tweets status due to the API');
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').setAttribute('role', 'link');
                    document.querySelector('.css-1dbjc4n.r-1d09ksm.r-1471scf.r-18u37iz.r-1wbh5a2:last-of-type > .${message.data.el.replaceAll(' ', '.')}').setAttribute('href', 'https://github.com/NetherMCtv/ReturnTwitterTweetSource/wiki/%22An-error-occured-while-loading-source-(click-for-more-info)%22');
                    return true;
                } else { return false; }
            })();
            `);
        }
    }
});
