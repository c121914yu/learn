#̰����

``` bash
��Ҫ˼·��
	1 ������
		1.1 ����ͷ������
		1.2 1����ͷ
		1.3 �����ͷ
	
	2 ���߶�����
		2.1 ��Ӽ����¼�
		2.2 animate�˶�

	3 ���Ͷ��ʳ��
		3.1 ����������λ��
		3.2 �ж��Ƿ�����ͷ��ͻ���������أ�
		
	4 ��ʳ��
		4.1 ��ײ���
	
	5 ��Ե���
		5.1 ��Ե��ײ
		5.2 ������ײ
		5.3 GameOver
```

##��������
###canvas�������
```bash
	1 ������Ļ��С����canvas��С
	2 ��canvasƽ���ֳ�n�ݣ�ÿ�ݳ���30
```
### ��ʼ���ĵ����
```bash
	if(canvas.width / 2 % 30 === 0 )
		x = canvas.width / 2 - r
	else
		x = canvas.width / 2
	if(canvas.height / 2 % 30 === 0) 
		y = canvas.width / 2 - r
	else
		y = canvas.width / 2
```
###��ײ���
```bash
	���ж�����Ϊx,y Ŀ��Ϊdir ֱ��dia
	XMax = x + dia
	Xmin = x - dia
	YMax = y + dia
	YMin = y - dia
	if(dir.x > Xmin && dir.x < Xmax && dir.y > Ymin && dir.y < Ymax)
		return true
	else
		return false
```

##����
```bash
	keyCode : 
		37 ��
		38 ��
		39 ��
		40 ��
```

