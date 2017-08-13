var LZH = {};
/* 鸭式辨型法接口  */
/* 接口类 */

/* 
一 、定义一个接口类基类
接口类需要两个参数
参数：1、接口的名字 name     
参数：2、接口的方法 method
*/
LZH.Interface = function(name, method) {
    var me = this;
    if (arguments.length != 2) {
        throw new Error(
            "arguments is not match,should be 2 arguments.now is " + arguments.length
        );
    }
    me.name = name;
    me.method = [];
    for (var i = 0, len = method.length; i < len; i++) {
        if (typeof method[i] != "string") {
            throw new Error(
                "method name should be typeof String,now is " + typeof method[i]
            );
        }
        me.method.push(method[i]);
    }
};

/* 三、检验接口里的方法 */
LZH.Interface.ensureImplements = function(object) {
    // 先判断接口检验函数接收参数是否满足个数要求
    // 最少要有一个对象和一个接口
    // alert("check1");
    if (arguments < 2) {
        throw new Error("arguments is less 2");
    }
    //alert("check2");
    // 获得接口实例对象，i从1开始，0是object
    for (var i = 1, len = arguments.length; i < len; i++) {
        var intanceInterface = arguments[i];
        //alert("intanceInterface is :" + intanceInterface);
        //判断参数是否一个接口
        if (intanceInterface.constructor !== LZH.Interface) {
            throw new Error("argument constructor is not a Interface constructor");
        }
        // alert("check3");
        // 判断接口构造函数里是否全面实现接口实例类里的方法
        for (var j = 0, len = intanceInterface.method.length; j < len; j++) {
            var methodName = intanceInterface.method[j];
            // alert("method is :" + methodName);
            // 核心代码：检验接口里是否有相关方法，接口里相关的方法名称是否已实现为function
            if (!object[methodName] || typeof object[methodName] !== "function") {
                throw new Error(
                    methodName + " not exist in object ,or methodName not a function"
                );
            }
        }
    }
};

/* .多继承 */
LZH.Mix = function() {
    var i = 1,
        len = arguments.length,
        target = arguments[0],
        arg;
    for (; i < len; i++) {
        arg = arguments[i];
        //遍历被继承对象中的属性
        for (var property in arg) {
            // 将被继承对象中的属性复制到目标对象中
            target[property] = arg[property];
        }
    }
    return target;
};
/* 单继承 */
LZH.Extend = function(superClass, subClass) {
    var F = new Function();
    F.prototype = sup.prototype;
    sub.prototype = new F();
    // 还原子类的构造器
    sub.prototype.constructor = sub;
    // 保存一下父类的原型对象
    sub.SuperClass = sup.prototype;
};

/* 遍历多维数组 */
LZH.arrayEach = function(array, fn) {
    try {
        if (!count) {
            var count = 0;
        }
        // 当数组的长度大于0且传入的参数为函数类型
        if (array.length > 0 && fn.constructor == Function) {
            // 循环数组的每项
            while (count < array.length) {
                var e = array[count];
                if (e && e.constructor == Array) {
                    LZH.arrayEach(e, fn);
                } else {
                    fn.call(e, e);
                }
                count++;
            }
            count = null;
        }
    } catch (error) {
        console.log(error);
    }
    return this;
}