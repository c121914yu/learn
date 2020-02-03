
``` bash
css网格布局

display: grid;
grid-template-columns: 70% 30%; 设置每个容器的宽占比
grid-template-columns: 1fr 2fr 1fr;1:2:1
grid-column-gap: 1rem; 列距
grid-row-gap: 1rem; 行距
grid-gap: 1rem; 同时设置
grid-auto-rows: 100px; 高度
grid-auto-rows: minmax(100px,auto); 最小高度，超过自动撑高
justify-items: stretch; 横轴对齐方式
align-items: stretch; 纵轴对齐方式

grid-template-areas:   模板
'header header header'
'content content sidebar'
'box-1 box-2 box-2'
'box-3 box-4 box-4'
'footer footer footer';
grid-area: header;
```
