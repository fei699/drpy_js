var rule = {
    title: '金牌影院',
    host: 'https://www.cfkj86.com',
    url: '/vod/show/id/fyclass/page/fypage',
    searchUrl: '/api/mw-movie/anonymous/video/searchByWordPageable?keyword=**&pageNum=fypage&pageSize=12&type=false',
    headers: {
        'User-Agent': 'PC_UA',
        'Referer': 'https://www.cfkj86.com/'
    },
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    class_name: '电影&电视剧&综艺&动漫',
    class_url: '1&2&3&4',
    limit: 6,
    double: false,
    play_parse: true,
    lazy: $js.toString(() => {
        let url_id = input.split('/')[5];
        let jishu_id = input.split('/')[7];
        let t = new Date().getTime();
        eval(getCryptoJS);
        let signkey = 'id=' + url_id + '&nid=' + jishu_id + '&key=cb808529bae6b6be45ecfab29a4889bc&t=' + t;
        let key = CryptoJS.SHA1(CryptoJS.MD5(signkey).toString()).toString();
        let json_data = JSON.parse(request('https://www.chrqj.com/api/mw-movie/anonymous/v1/video/episode/url?id=' + url_id + '&nid=' + jishu_id, {
            headers: {
                'User-Agent': 'PC_UA',
                'sign': key,
                't': t
            }
        }));
        let url = json_data.data;
        log(url);
        
        if (typeof(html) === 'Object') playUrl = html.data.playUrl;
    else if(typeof(html) === 'string') playUrl = JSON.parse(html).data.playUrl;
    /*
        if (url) {
        
            input = {parse: 0, url: url, header: rule.headers};
        }
*/
    }),
    图片替换: $js.toString(() => {
        // log(MY_URL);
        let src = decodeURIComponent(input).split(',')[0].split(' ')[0];
        input = urljoin(MY_URL, src) + '@Referer=https://www.cfkj86.com/';
    }),
     double: false,
    推荐: '*',
   一级: '.movie-ul&&a;.title&&Text;.card-img&&img&&srcset;.info-tag&&Text;a&&href',
    //一级: '.movie-ul&&a;.title&&Text;.card-img&&img&&srcset;.bottom&&Text;a&&href',
   
   二级: {
                "title": "h1&&Text;.tag&&Text",
                "img": "img&&src",
                "desc": ";;;.director:eq(1)&&Text;.director:eq(0)&&a&&Text",
                "content": ".wrapper_more_text&&Text",
                "tabs": ".player_name",
                "lists": ".listitem a"
            },
    
    搜索: '*',
}