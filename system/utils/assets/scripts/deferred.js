/**

	state: 'inited',

	queue: 0,


	then: function (fn, bind) {
		return this.once('done', fn, bind);
	},
		this.state = 'running';
	},
		this.state = 'pause';
	},
		this.pause();
		this.state = 'stopped';
	},
			me.start();
		}, timeout || 0);
			this.queue = [];
			this.queue.shift()
				.once('alldone', function () {
					this.progress();
				}, this)
				.start();
		} else {
			this.trigger('alldone');
		this.state = 'abort';
		this.un('done');
		this.progress();
	},
		this.state = 'done';
		this.trigger('done', args);
		this.progress();

/**
 * �������ͬʱ������Ĵ���������
 * wait - �ȴ��ϸ�������ɡ�
 * ignore - ���Ե�ǰ������
 * stop - �����ж��ϸ��������ϸ������Ļص�������ִ�У�Ȼ��ִ�е�ǰ������
 * abort - �Ƿ�ֹͣ�ϸ��������ϸ������Ļص������ԣ�Ȼ��ִ�е�ǰ������
 * replace - �滻�ϸ�����Ϊ�µĲ������ϸ������Ļص��������ơ�
 */

		switch (linkType) {
			case 'wait':
				// �� deferred �ŵ��ȴ����С�
				deferredA.then(function () {
					Deferred.instances[type] = this;
					this.start();
				}, deferredB);
				return deferredB;
			case 'stop':
				deferredA.stop();
				break;
			case 'abort':
				deferredA.abort();
				break;
				//case 'replace':
				//	deferredA.pause();
				//	deferredA.run = deferredB.run;
				//	deferredA.start();
				//	break;
			default:
				assert(!linkType || linkType === 'ignore', "Deferred.link(data): ��Ա {link} ������ wait��cancel��ignore ֮һ��", linkType);
				return deferredB;
		}

	}
