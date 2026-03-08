(function () {
            // ==================== 运维修改区 ====================
            const section2Config = {
                // 专辑名称（.section2-name）
                name: "《爱如蝉翼》",

                // 封面图路径（.album-cover 背景图）
                coverImage: "./ghost-resources/index/album/album2/Albumcover.jpg",

                // CD 盘面图路径（.album-main 背景图）
                cdImage: "./ghost-resources/index/album/album2/AlbumCD.png",

                // 歌曲列表（至少2首，最多3首）
                songs: [
                    { displayName: "01 爱如蝉翼", src: "./ghost-resources/index/album/album2/01album-songs.mp3" }
                ],

                // 右侧额外链接（.album-songs-info 内的 a 标签）
                extraLink: {
                    text: "You can click here to view videos related to the album.",
                    url: "https://y.qq.com/n/ryqq_v2/mv/004HWo3V1h9Da6"
                },

                // 底部中英文介绍（支持 HTML 标签，通常使用 <p> 包裹段落）
                intro: {
                    en: `
          <p>The theme promotional song "Love Like Cicada Wings" for the drama series Thorny Roses,</p>
          <p>passionately performed by Huang Xiaoyun, has officially been released. The song was composed by Huang Xiaoyun, with lyrics by Yao Ruolong, arranged by Huang Xiaoyun and Chu Lidong, and produced by Wang Jiacheng and Huang Xiaoyun.</p>
          <p>Love is the courage to hang by a thread, and the clarity to unravel its strands.</p>          
          <p>With her voice, Huang Xiaoyun weaves wings both fragile and resilient; with his lyrics, Yao Ruolong lays bare the truest texture of love. This song, "Love Like Cicada Wings," becomes the footnote for every soul in Thorny Roses who gets lost, struggles, yet ultimately chooses to take the leap in love.</p>      
          `,
                    zh: `
          <p>由黄霄雲倾情献唱的影视剧《玫瑰丛生》主题推广曲《爱如蝉翼》正式上线。歌曲由黄霄雲作曲，姚若龙作词，黄霄雲与褚立东共同编曲，王嘉诚与黄霄雲共同制作。</p>
          <p>爱是悬丝的勇气，也是抽丝的清醒。</p>
          <p>黄霄雲用声线织就脆弱而坚韧的羽翼，姚若龙用词笔剖开爱情最真实的肌理，这首《爱如蝉翼》便成了影视剧《玫瑰丛生》中，所有在爱中迷途、挣扎、却又选择纵身一跃的灵魂的注脚。</p>
        `
                },
                // 背景渐变终点颜色（原 #622962）
                gradientEndColor: '#B27F9E',   // 可根据需要修改，例如 '#ff0000'
            };
            // ==================== 配置结束 ====================

            // 更新函数
            function updateSection2(config) {
                // 1. 更新专辑名称
                const nameEl = document.querySelector('.section2-name');
                if (nameEl) nameEl.textContent = config.name;

                // 2. 更新左侧封面图与 CD 图
                const coverEl = document.querySelector('.box-left .album-cover');
                const cdEl = document.querySelector('.box-left .album-main');
                if (coverEl) coverEl.style.backgroundImage = `url('${config.coverImage}')`;
                if (cdEl) cdEl.style.backgroundImage = `url('${config.cdImage}')`;

                // 3. 重建右侧歌曲列表及额外链接
                const boxRight = document.querySelector('.box-right');
                if (boxRight) {
                    // 清空现有内容
                    boxRight.innerHTML = '';

                    // 添加歌曲项（最多3首，至少1首）
                    if (config.songs && config.songs.length > 0) {
                        config.songs.slice(0, 3).forEach(song => {
                            const songDiv = document.createElement('div');
                            songDiv.className = 'album-songs';

                            const nameDiv = document.createElement('div');
                            nameDiv.textContent = song.displayName;
                            songDiv.appendChild(nameDiv);

                            const audio = document.createElement('audio');
                            audio.src = song.src;
                            audio.controls = true;
                            audio.setAttribute('reload', 'metadata');
                            audio.className = 'custom-audio';
                            songDiv.appendChild(audio);

                            boxRight.appendChild(songDiv);
                        });
                    }

                    // 添加额外链接（如果配置中存在）
                    if (config.extraLink) {
                        const infoDiv = document.createElement('div');
                        infoDiv.className = 'album-songs-info';

                        const link = document.createElement('a');
                        link.href = config.extraLink.url;
                        link.target = '_blank';
                        link.textContent = config.extraLink.text;
                        infoDiv.appendChild(link);

                        boxRight.appendChild(infoDiv);
                    }

                    const section2 = document.querySelector('.section2');
  if (section2 && config.gradientEndColor) {
    section2.style.background = `linear-gradient(to bottom, black 50%, ${config.gradientEndColor} 100%)`;
  }
                }

                // 4. 更新底部中英文介绍
                const introEn = document.getElementById('introEn');
                const introZh = document.getElementById('introZh');
                if (introEn) introEn.innerHTML = config.intro.en;
                if (introZh) introZh.innerHTML = config.intro.zh;

                // 确保默认显示英文（保留 active 类）
                if (introEn && introZh) {
                    introEn.classList.add('active');
                    introZh.classList.remove('active');
                }

                // 5. 重新初始化音频控件（音量、暂停其他等）
                initAudioControls();
            }

            // 音频初始化函数（与原逻辑保持一致）
            function initAudioControls() {
                const audios = document.querySelectorAll('.custom-audio');
                if (!audios.length) return;

                function pauseOthers(currentAudio) {
                    audios.forEach(audio => {
                        if (audio !== currentAudio) {
                            audio.pause();
                            audio.currentTime = 0;
                        }
                    });
                }

                audios.forEach(audio => {
                    // 设置默认音量为 0.5
                    audio.volume = 0.5;

                    // 监听元数据加载完成，再次确保音量
                    audio.addEventListener('loadedmetadata', function onMetadata() {
                        if (Math.abs(audio.volume - 0.5) > 0.01) audio.volume = 0.5;
                    });

                    // 监听可以播放事件，再次确保音量
                    audio.addEventListener('canplay', function onCanplay() {
                        if (Math.abs(audio.volume - 0.5) > 0.01) audio.volume = 0.5;
                    });

                    // 播放时暂停其他音频
                    audio.addEventListener('play', function onPlay() {
                        pauseOthers(audio);
                    });
                });
            }

            // 在 DOM 加载完成后执行更新
            document.addEventListener('DOMContentLoaded', function () {
                updateSection2(section2Config);
            });
        })();