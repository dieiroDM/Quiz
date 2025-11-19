const questions = [
            {
                question: "Se fôssemos ter o nosso primeiro encontro, onde seria perfeito?",
                options: ["Cinema e Pipocas", "Jantar", "Praia", "Filme em casa"],
                correct: 3 // Muda este número para a tua preferência real (0, 1, 2 ou 3)
            },
            {
                question: "Se eu pudesse comer apenas uma coisa para sempre, o que seria?",
                options: ["Pizza", "Sushi", "Hambúrguer", "Chocolate"],
                correct: 0 
            },
            {
                question: "Qual destas qualidades eu mais valorizo numa pessoa?",
                options: ["Inteligência", "Sentido de Humor", "Sinceridade", "Beleza"],
                correct: 3
            },
            {
                question: "Se fôssemos ver um filme juntos, qual género eu escolheria?",
                options: ["Terror (para tu me abraçares)", "Comédia Romântica", "Ação", "Ficção Científica"],
                correct: 0
            },
            {
                question: "Quem é mais provável de mandar a primeira mensagem de 'Bom dia'?",
                options: ["Eu (claro!)", "Tu", "Os dois ao mesmo tempo", "Nenhum, somos orgulhosos"],
                correct: 0
            },
            {
                question: "Se ganhássemos uma viagem agora, para onde eu iria contigo?",
                options: ["Paris (Romântico)", "Nova Iorque (Agitado)", "Ilhas Maldivas (Relax)", "Brazil (Diversão)"],
                correct: 3
            },
            {
                question: "O que me faz sorrir mais rápido?",
                options: ["Um elogio fofo", "Um meme engraçado", "Comida", "Uma mensagem tua"],
                correct: 3
            },
            {
                question: "Numa escala de 0 a 10, quão ciumento(a) achas que eu sou?",
                options: ["0 - De boa", "5 - Um pouco", "8 - Muito ciumento", "10 - FBI Investigações"],
                correct: 2
            },
            {
                question: "Qual é a minha 'Linguagem do Amor'?",
                options: ["Toque Físico", "Tempo de Qualidade", "Presentes", "Palavras de Afirmação"],
                correct: 0
            },
            {
                question: "Para terminar: qual é a probabilidade de darmos certo?",
                options: ["0% (Amigos)", "50% (Vamos ver)", "85% (Amigos coloridos)", "100% (Almas gémeas)"],
                correct: 2 // Dica: Coloca a resposta que queres ouvir! ;)
            }
        ];

        // --- VARIÁVEIS DE ESTADO ---
        let currentQuestionIndex = 0;
        let score = 0;
        let isAnswering = false; // Evita cliques duplos

        // --- ELEMENTOS DO DOM ---
        const startScreen = document.getElementById('start-screen');
        const quizScreen = document.getElementById('quiz-screen');
        const resultScreen = document.getElementById('result-screen');
        
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');
        const progressEl = document.getElementById('progress-display');
        const scoreEl = document.getElementById('final-score');
        const resultMsgEl = document.getElementById('result-msg');
        const headerTitle = document.getElementById('header-title');

        // --- FUNÇÕES DO JOGO ---

        function startGame() {
            score = 0;
            currentQuestionIndex = 0;
            showScreen(quizScreen);
            loadQuestion();
        }

        function loadQuestion() {
            isAnswering = false;
            const currentQ = questions[currentQuestionIndex];
            
            // Atualizar textos
            headerTitle.innerText = "Pergunta " + (currentQuestionIndex + 1);
            progressEl.innerText = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;
            questionEl.innerText = currentQ.question;

            // Limpar opções anteriores
            optionsEl.innerHTML = '';

            // Criar botões
            currentQ.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.classList.add('option-btn');
                btn.innerText = option;
                btn.onclick = () => checkAnswer(index, btn);
                optionsEl.appendChild(btn);
            });
        }

        function checkAnswer(selectedIndex, btnElement) {
            if (isAnswering) return; // Bloqueia cliques extras
            isAnswering = true;

            const currentQ = questions[currentQuestionIndex];
            const allButtons = document.querySelectorAll('.option-btn');

            // Desabilitar todos os botões para não mudar a resposta
            allButtons.forEach(btn => btn.classList.add('disabled'));

            // Verificar lógica
            if (selectedIndex === currentQ.correct) {
                score++;
                btnElement.classList.add('correct');
            } else {
                btnElement.classList.add('wrong');
                // Mostrar qual era a correta para aprender
                allButtons[currentQ.correct].classList.add('correct');
            }

            // Esperar 1.5 segundos e ir para próxima
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    loadQuestion();
                } else {
                    showResults();
                }
            }, 1500);
        }

        function showResults() {
            showScreen(resultScreen);
            headerTitle.innerText = "Resultado Final";
            progressEl.innerText = "Jogo concluído";
            
            scoreEl.innerText = `${score} / ${questions.length}`;

            // Mensagem personalizada baseada na pontuação
            const percentage = (score / questions.length) * 100;
            if (percentage === 100) {
                resultMsgEl.innerText = "Perfeito! Você me conhece! 🏆";
            } else if (percentage >= 60) {
                resultMsgEl.innerText = "Muito bom! Bom trabalho. 👏";
            } else {
                resultMsgEl.innerText = "Podes fazer melhor. Tenta outra vez! 💪";
            }
        }

        function restartGame() {
            showScreen(startScreen);
            headerTitle.innerText = "Perguntas e Respostas";
            progressEl.innerText = "Vamos ver o quanto me conheces!";
        }

        // Função auxiliar para trocar de tela
        function showScreen(screen) {
            // Esconde todas
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            // Mostra a desejada
            screen.classList.add('active');
        }