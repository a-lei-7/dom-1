window.dom = {
  create(string) {
    const container = document.createElement("template"); //template ： html 中可以容纳所有元素的标签
    container.innerHTML = string.trim(); //trim() 可以略去 string 中字符串两边的空格等
    return container.content.firstChild; //  container.content.firstChild 可以将 template 中的元素展现出来
  },
  after(node, node2) {
    // 在 node 后添加 node2
    node.parentNode.insertBefore(node2, node.nextSibling); //把 node2 插入到 node 下一个节点的前面
  },
  before(node, node2) {
    // 将 node2 插入到 node 前面
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    // 给这个 parent 再加上一个 node
    parent.appendChild(node);
  },
  wrap(node, parent) {
    // 给 node 加一个 parent
    dom.before(node, parent); //先把 parent 移动到 node 的前面
    dom.append(parent, node); //再将 node 设置为 parent 的儿子, 之前的这个 node 就会从原先的地方消失
  },
  remove(node) {
    // 删除一个节点
    node.parentNode.removeChild(node);
    return node; // 返回这个节点，以便后面获取删除结点的引用
  },
  empty(node) {
    // 干掉这个 node 里面的所有儿子
    const array = [];
    let x = node.firstChild;
    while (x) {
      //如果 x 存在，那么就移除 x ，并把节点信息 push 进 array
      array.push(dom.remove(node.firstChild));
      x = node.firstChild; //然后将 x 再指向移除第一个元素之后的 node 的 firstChild
    }
    return array; //最后返回 array
  },
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    //适配
    // 可通过( innerText in node) 来判断使用 innerText 还是 textContent
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = String;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div , 'color' , 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div,{color: 'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key]; // 变量做 key 的话，记得加上 [ ], 如果 .key 的话，会变成字符串
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className); // .contains 可以检测 classList 中有无 className
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    //选择所有名为 selector 的标签， 可以加上选择范围 scop
    return (scope || document).querySelectorAll(selector);
    //如果有 scope 就在scope 内寻找，如果没有就在总的 document 内寻找
    //返回值是数组，所以要加上 下标[]
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node);
    //通过 filter 对这个数组进行过滤，只要不等于 node ，就放进数组里
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      // 如果 x 存在 且  node.nextSibling 的 nodeType 为文本的话，就让 x 等于它的下一个节点
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      // 如果 x 存在 且  node.nextSibling 的 nodeType 为文本的话，就让 x 等于它的下一个节点
      x = x.previousSibling;
    }
    return x;

  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  index(node) {
    const list = dom.children(node.parentNode)
    // 用 dom.children 取得 node 的父亲的所有 children ，然后利用 for 循环和 if ，判断 list[i] === node,是的话就停止循环，返回 i 
    let i //在 for 的外面声明 i ，以便在 for 外面返回 i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  }

};