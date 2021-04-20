const o = {}
const f =  function () {return this.a}
const b = f.bind(o)
const a = () => {}
const bb = b.bind({a: 5})

o.a = 1
f.a = 2
b.a = 3
a.a = 4
bb.b = 5

'';
