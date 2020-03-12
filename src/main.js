const div = dom.create("<div>createDiv</div>")
console.log(div)

dom.after(test, div)

const div3 = dom.create('<div id="parent"></div>')
console.log(div3)
dom.wrap(test, div3)

const nodes = dom.empty(window.empty)
console.log(nodes)

dom.attr(test, 'title', 'ErGou')
const title = dom.attr(test, 'title')
console.log(`"title":${title}`)

dom.text(test, "慎独")
console.log(dom.text(test))

dom.style(test, {
    border: '1px solid green',
    color: 'purple'
})
dom.style(test, 'color', 'blue')
const testColor = dom.style(test, 'color')
console.log(`testColor: ${testColor}`)

dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(`test是否有blue属性：
    ${dom.class.has(test, 'blue')}`)

const fn = () => {
    console.log('点击了')
}

dom.on(test, 'click', )

dom.off(test, 'click', fn)

console.log(dom.parent(test))

const testDiv = dom.find('#test2')[0] //记得加下标
console.log(testDiv)

console.log(dom.find('.red', test2)[0]) //找到在 test2 中 ，class为 red 的元素

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
console.log(dom.children(t)) //这是一个伪数组
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))
dom.each(dom.children(t), (n) => console.log(n))

console.log(dom.index(s2))