// 实现加载文档后的一些渲染工作


// 实现根据文章自动生成目录
//利用文章中的 h3 标签中的内容作为目录内容，点击即可跳转。仅当检测到 div.article-text>h3 时会生成目录
function readyForRead(){
    createIndex();
}

function createIndex(){
    let indexs = document.querySelectorAll('div.article-text>h2');
    if (indexs.length == 0){
        // 没有从文章处获取到 h2 标签，说明不需要添加目录
        return false;
    }

    for (i = 0; i < indexs.length; i++){
        // 为每个 h2 设置 id 作为书签使用
        indexs[i].setAttribute('id', indexs[i].innerText);
    }

    let contentArea = document.createElement('div');    // 目录总区域
    contentArea.setAttribute('class', 'content');   // 设置目录框的类以应用 css

    let contentGuider = document.createElement('div');  // 目录引导区域
    contentGuider.setAttribute('class', 'content-guider');
    contentGuider.innerHTML = '&#10148; 目录';
    contentArea.appendChild(contentGuider);

    let indexArea = document.createElement('div');  // 目录的实际点击跳转区域
    indexArea.setAttribute('class', 'content-index');
    let bookmark = undefined;
    for (i = 0; i < indexs.length; i++){
        // 为每个 h2 设置跳转标签
        bookmark = document.createElement('a');
        bookmark.setAttribute('href', '#' + indexs[i].innerText);
        bookmark.innerHTML = indexs[i].innerText;
        indexArea.appendChild(bookmark);
    }
    contentArea.appendChild(indexArea);

    // 将 contentArea 插入到页面当中去，实际上因为 css 使用绝对定位的方式，插入到哪里都是一样的
    // 但是为了逻辑上方便找，选择插入到 文章栏 和 分类栏 之间
    document.body.insertBefore(contentArea, document.getElementsByClassName('article')[0]);
    return true;
}
