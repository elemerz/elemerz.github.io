window.JSPerf = {
    arrayPush: function() {

        this.makeHtml1();
        this.makeHtml2();
        this.makeHtml3();
        this.makeHtml4();
        this.makeHtml5();
    },
    cleanUp: function() {
        document.getElementById('lst').innerHTML ='';
    },
    makeHtml1: function(){
        this.cleanUp();
        let t0 = performance.now(), t1;
        let i, a = [];
        for(i = 0; i < 10000; i++) {
            a.push('<option value="'+ i +'">' + i +'</option>');
        }
        document.getElementById('lst').innerHTML = a.join('');
        t1=performance.now();
        console.log('Performance of makeHtml1 (Array.push() + innerHTML) = ', t1-t0);
    },
    makeHtml2: function(){
        this.cleanUp();
        let t0 = performance.now(), t1;
        let a = new Array(10000);
        for(let i = 0, l = a.length; i < l; i++) {
            a[i]=`<option value="${i}">${i}</option>`;
        }
        document.getElementById('lst').innerHTML = a.join('');
        t1=performance.now();
        console.log(`Performance of makeHtml2 (Array[i]= + innerHTML) = `, t1-t0);
    },
    makeHtml3: function(){
        this.cleanUp();
        let t0 = performance.now(), t1;
        let lst = document.getElementById('lst'), lstNew = lst.cloneNode(false), a = new Array(10000);
        for(let i = 0, l = a.length; i < l; i++) {
            a[i]=`<option value="${i}">${i}</option>`;
        }
        lstNew.innerHTML = a.join('');
        lst.parentNode.replaceChild(lstNew, lst);

        t1=performance.now();
        console.log(`Performance of makeHtml3 (.replaceChild with detachedNode) = `, t1-t0);
    },
    makeHtml4: function() {
        document.getElementById('lst').innerHTML = '';
        let t0 = performance.now(), t1;
        let a = new Array(10000);
        for (let i = 0, l = a.length; i < l; i++) {
            a[i] = `<option value="${i}">${i}</option>`;
        }
        document.getElementById('lst').insertAdjacentHTML('afterbegin', a.join(''));

        t1 = performance.now();
        console.log(`Performance of makeHtml4 (insertAdjacentHTML) = `, t1 - t0);
    },
    makeHtml5: function(){
        this.cleanUp();
        let t0 = performance.now(), t1;
        let lst = document.getElementById('lst'), parentNode = lst.parentNode, a = new Array(10000);
        lst = lst.parentNode.removeChild(lst);
        for(let i = 0, l = a.length; i < l; i++) {
            a[i]=`<option value="${i}">${i}</option>`;
        }
        lst.insertAdjacentHTML('afterbegin', a.join(''));
        parentNode.appendChild(lst);
        t1=performance.now();
        console.log(`Performance of makeHtml5 (insertAdjacentHtml detached) = `, t1-t0);
    }
};