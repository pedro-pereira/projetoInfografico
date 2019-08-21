var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'renderPhaser', { preload: preload, create: create, update:update});

var reg = {};

// Tela principal
var personagemPrincipal, travesseiro; 
var grupoApresentacao, grupoTratamentos, grupoCpap, grupoPerguntas;
var tween;
var telaPrincipal, menuCreditos, estrelas, cobertor, somRonco;
var iconeComSom, iconeSemSom, tocaSom = 1;

// Tela Apresentacao
var engasgo, faltaConcentracao, ronco, sonoNaoRestaurador, sonolencia, fadiga;
var respiracaoApneia, respiracaoCorreta, legendaRespiracaoApneia, legendaRespiracaoCorreta;
var telaAos, tituloAos, tituloSintomas, tituloConsequencia, textoAos, textoConsequencia1, textoConsequencia2, textoConsequencia3;

// Tela Tratamentos
var telaTratamentos, tituloDiagnostico, textoDiagnostico, tituloTratamento;
var iconeHigiene, iconeRemedio, iconeFono, iconeCirugia, iconeIntraoral, iconeCpap;
var textoHigiene, textoRemedio, textoFono, textoCirugia, textoIntraoral, textoCpapTrat;
var linkPolissonografia;
var primeiroCliqueTratamentos;
var transicao = false;
var fimPrimeiroClique = false;

// Tela Cpap
var telaCpap, tituloCpap, tituloBeneficios, tituloExperimente;
var textoCpap, textoBeneficios, textoInformacoes;
var aparelhoCpap, botaoPlay, textoArrasteCpap;
var mascaraAcoplada = false;
var personagemErradoCpap, personagemCertoCpap;

// Tela Perguntas
var telaPerguntas, tituloDuvidas, celular, frameResposta, perguntaLabel;
var pergunta1, pergunta1Balao1, pergunta1Balao2, pergunta1Balao3, pergunta1Balao4;
var pergunta2, pergunta2Balao1, pergunta2Balao2, pergunta2Balao3;
var pergunta3, pergunta3Balao1, pergunta3Balao2, pergunta3Balao3;
var pergunta4, pergunta4Balao1, pergunta4Balao2, pergunta4Balao3;
var pergunta5, pergunta5Balao1, pergunta5Balao2, pergunta5Balao3;
var pergunta6, pergunta6Balao1, pergunta6Balao2;
var primeiroCliqueDuvidas = true;
var fimPrimeiroCliqueDuvidas = false;
var transicaoDuvidas = false;

// Tela Creditos
var telaCreditos, textoCreditos;
var telaCinzaVideo;

var limiteCima,limiteBaixo;

function preload (){

	game.load.image('invi'                               , 'imagens/invi.png');

	// Tela Principal
	game.load.image('telaPrincipal'                      , 'imagens/tela-0.png');
	game.load.image('telaCinza'                          , 'imagens/tela-cinza.png');
	game.load.image('tituloPrincipal'                    , 'imagens/tituloPrincipal.png');

	game.load.atlasJSONHash('personagemPrincipal'        , 'imagens/sprite_personagem_principal.png'
                                                         , 'imagens/sprite_personagem_principal.json');

	game.load.image('telaCinzaVideo'                     , 'imagens/tela-cinza.png');

	game.load.image('estrelas'                           , 'imagens/estrelas.png');
	game.load.image('cobertor'                           , 'imagens/cobertor.png');

	game.load.image('iconeComSom'                        , 'imagens/icone-com-som.png');
	game.load.image('iconeSemSom'                        , 'imagens/icone-sem-som.png');

	game.load.audio('somRonco'                           , 'sons/ronco-com-apito.wav');

	game.load.image('grupoApresentacao'                  , 'imagens/ovelha-1.png');
	game.load.image('grupoTratamentos'                   , 'imagens/ovelha-2.png');
	game.load.image('grupoCpap'                          , 'imagens/ovelha-3.png');
	game.load.image('grupoPerguntas'                     , 'imagens/ovelha-4.png');

	game.load.image('menuCreditos'                       , 'imagens/menu-creditos.png');

	game.load.image('bgModal'                            , 'imagens/bg-modal.png');

	// Modal Apresentação
	game.load.image('botaoFecharApresentacao'            , 'imagens/botaoFechar.png');

	game.load.atlasJSONHash('engasgo'                    , 'imagens/engasgo.png', 'imagens/engasgo.json');
	game.load.atlasJSONHash('faltaConcentracao'          , 'imagens/falta-concentracao.png', 'imagens/falta-concentracao.json');
	game.load.atlasJSONHash('ronco'                      , 'imagens/ronco.png', 'imagens/ronco.json');
	game.load.atlasJSONHash('sonoNaoRestaurador'         , 'imagens/sono-nao-restaurador.png', 'imagens/sono-nao-restaurador.json');
	game.load.atlasJSONHash('sonolencia'                 , 'imagens/sonolencia.png', 'imagens/sonolencia.json');
	game.load.atlasJSONHash('fadiga'                     , 'imagens/fadiga.png', 'imagens/fadiga.json');

	game.load.atlasJSONHash('respiracaoApneia'           , 'imagens/sprite-respiracao-apneia.png'
                                                         , 'imagens/sprite-respiracao-apneia.json');
	game.load.atlasJSONHash('respiracaoCorreta'          , 'imagens/sprite-respiracao-correta.png'
                                                         , 'imagens/sprite-respiracao-correta.json');

	game.load.image('tituloAos'                          , 'imagens/tela-1-titulo-aos.png');
	game.load.image('tituloSintomas'                     , 'imagens/tela-1-titulo-sintomas.png');
	game.load.image('tituloConsequencia'                 , 'imagens/tela-1-titulo-consequencia.png');
	game.load.image('textoAos'                           , 'imagens/tela-1-texto-aos.png');
	game.load.image('textoConsequencia1'                 , 'imagens/tela-1-texto-consequecia-1.png');
	game.load.image('textoConsequencia2'                 , 'imagens/tela-1-texto-consequecia-2.png');
	game.load.image('textoConsequencia3'                 , 'imagens/tela-1-texto-consequecia-3.png');

	game.load.image('legendaRespiracaoApneia'            , 'imagens/legenda-respiracao-apneia.png');
	game.load.image('legendaRespiracaoCorreta'           , 'imagens/legenda-respiracao-correta.png');

	// Modal Tratamentos
	game.load.image('botaoFecharTratamentos'             , 'imagens/botaoFechar.png');
	game.load.image('tituloDiagnostico'                  , 'imagens/tela-2-titulo-diagnostico.png');
	game.load.image('tituloTratamentos'                  , 'imagens/tela-2-titulo-tratamentos.png');
	game.load.image('textoDiagnostico'                   , 'imagens/tela-2-texto-diagnostico.png');
	game.load.image('linkPolissonografia'                , 'imagens/tela-2-link-polissonografia.png');

	game.load.image('iconeHigiene'                       , 'imagens/tela-2-icone-exercicios.png');
	game.load.image('iconeRemedio'                       , 'imagens/tela-2-icone-remedio.png');
	game.load.image('iconeFono'                          , 'imagens/tela-2-icone-fono.png');
	game.load.image('iconeCirugia'                       , 'imagens/tela-2-icone-cirugia.png');
	game.load.image('iconeIntraoral'                     , 'imagens/tela-2-icone-ortodontico.png');
	game.load.image('iconeCpap'                          , 'imagens/tela-2-icone-cpap.png');

	game.load.image('textoHigiene'                       , 'imagens/tela-2-texto-exercicios.png');
	game.load.image('textoRemedio'                       , 'imagens/tela-2-texto-remedio.png');
	game.load.image('textoFono'                          , 'imagens/tela-2-texto-fono.png');
	game.load.image('textoCirugia'                       , 'imagens/tela-2-texto-cirugia.png');
	game.load.image('textoIntraoral'                     , 'imagens/tela-2-texto-ortodontico.png');
	game.load.image('textoCpapTrat'                      , 'imagens/tela-2-texto-cpap.png');

	// Modal CPAP
	game.load.image('botaoFecharCpap'                    , 'imagens/botaoFechar.png');
	game.load.image('aparelhoCpap'                       , 'imagens/aparelhoCpap.png');
	game.load.image('botaoPlay'                          , 'imagens/tela-3-botao-play.png');
	game.load.image('textoArrasteCpap'                   , 'imagens/tela-3-texto-arraste.png');
	game.load.atlasJSONHash('personagemErradoCpap'       , 'imagens/tela-3-personagem-respirando-errado.png'
                                                         , 'imagens/tela-3-personagem-respirando-errado.json');
	game.load.atlasJSONHash('personagemCertoCpap'        , 'imagens/tela-3-personagem-respirando-certo.png'
                                                         , 'imagens/tela-3-personagem-respirando-certo.json');

	game.load.image('tituloCpap'                         , 'imagens/tela-3-titulo-cpap.png');
	game.load.image('tituloBeneficios'                   , 'imagens/tela-3-titulo-beneficios.png');
	game.load.image('tituloExperimente'                  , 'imagens/tela-3-titulo-experimente.png');
	game.load.image('textoCpap'                          , 'imagens/tela-3-texto-cpap.png');
	game.load.image('textoBeneficios'                    , 'imagens/tela-3-texto-beneficios.png');
	game.load.image('textoInformacoes'                   , 'imagens/tela-3-texto-informacoes.png');

	// Modal Perguntas
	game.load.image('botaoFecharPerguntas'               , 'imagens/botaoFechar.png');
	game.load.image('tituloDuvidas'                      , 'imagens/tela-4-titulo-duvidas.png');
	game.load.image('celular'                            , 'imagens/perguntas/tela-4-celular.png');
	game.load.image('frameResposta'                      , 'imagens/perguntas/tela-4-frame-respostas.png');
	game.load.image('perguntaLabel'                      , 'imagens/perguntas/tela-4-label-medico.png');

	game.load.image('pergunta1'                          , 'imagens/perguntas/pergunta-1.png');
	game.load.image('pergunta1Balao1'                    , 'imagens/perguntas/pergunta-1-balao-1.png');
	game.load.image('pergunta1Balao2'                    , 'imagens/perguntas/pergunta-1-balao-2.png');
	game.load.image('pergunta1Balao3'                    , 'imagens/perguntas/pergunta-1-balao-3.png');
	game.load.image('pergunta1Balao4'                    , 'imagens/perguntas/pergunta-1-balao-4.png');

	game.load.image('pergunta2'                          , 'imagens/perguntas/pergunta-2.png');
	game.load.image('pergunta2Balao1'                    , 'imagens/perguntas/pergunta-2-balao-1.png');
	game.load.image('pergunta2Balao2'                    , 'imagens/perguntas/pergunta-2-balao-2.png');
	game.load.image('pergunta2Balao3'                    , 'imagens/perguntas/pergunta-2-balao-3.png');

	game.load.image('pergunta3'                          , 'imagens/perguntas/pergunta-3.png');
	game.load.image('pergunta3Balao1'                    , 'imagens/perguntas/pergunta-3-balao-1.png');
	game.load.image('pergunta3Balao2'                    , 'imagens/perguntas/pergunta-3-balao-2.png');
	game.load.image('pergunta3Balao3'                    , 'imagens/perguntas/pergunta-3-balao-3.png');

	game.load.image('pergunta4'                          , 'imagens/perguntas/pergunta-4.png');
	game.load.image('pergunta4Balao1'                    , 'imagens/perguntas/pergunta-4-balao-1.png');
	game.load.image('pergunta4Balao2'                    , 'imagens/perguntas/pergunta-4-balao-2.png');
	game.load.image('pergunta4Balao3'                    , 'imagens/perguntas/pergunta-4-balao-3.png');

	game.load.image('pergunta5'                          , 'imagens/perguntas/pergunta-5.png');
	game.load.image('pergunta5Balao1'                    , 'imagens/perguntas/pergunta-5-balao-1.png');
	game.load.image('pergunta5Balao2'                    , 'imagens/perguntas/pergunta-5-balao-2.png');
	game.load.image('pergunta5Balao3'                    , 'imagens/perguntas/pergunta-5-balao-3.png');

	game.load.image('pergunta6'                          , 'imagens/perguntas/pergunta-6.png');
	game.load.image('pergunta6Balao1'                    , 'imagens/perguntas/pergunta-6-balao-1.png');
	game.load.image('pergunta6Balao2'                    , 'imagens/perguntas/pergunta-6-balao-2.png');

	// Modal Créditos
	game.load.image('botaoFecharCreditos'                , 'imagens/botaoFechar.png');
	game.load.image('textoCreditos'                      , 'imagens/tela-creditos-texto.png');

	primeiroCliqueTratamentos = true;
}

function create (){

	// Tela Principal
	this.add.image(32, 32, "telaCinza");
	telaPrincipal = this.add.image(32, 32, "telaPrincipal");

	personagemPrincipal = this.add.sprite(354, 325, 'personagemPrincipal');
	personagemPrincipal.animations.add('run');
	personagemPrincipal.animations.play('run', 15, true);

	menuCreditos = this.add.image(820, 520, "menuCreditos");
	menuCreditos.inputEnabled = true;
	menuCreditos.events.onInputDown.add(showModalCreditos, this);

	estrelas = this.add.image(85, 172, "estrelas");
	cobertor = this.add.image(320, 535, "cobertor");

	iconeComSom = this.add.image(115, 526, "iconeComSom");
	iconeComSom.scale.x = 0.25;
	iconeComSom.scale.y = 0.25;
	iconeComSom.alpha = 1;
	iconeComSom.inputEnabled = true;

	iconeSemSom = this.add.image(115, 526, "iconeSemSom");
	iconeSemSom.scale.x = 0.25;
	iconeSemSom.scale.y = 0.25;
	iconeSemSom.alpha = 0;
	iconeSemSom.inputEnabled = false;

	iconeComSom.events.onInputDown.add(function() {
		tocaSom = tocaSom * -1;
		controlaSom();
	}, this);

	iconeSemSom.events.onInputDown.add(function() {
		tocaSom = tocaSom * -1;
		controlaSom();
	}, this);

	somRonco = game.add.audio('somRonco');
	somRonco.loopFull(0.6);
	somRonco.play();

	reg.modal = new gameModal(game);
	createModals();

	// GRUPO APRESENTACAO
	// Modelo para voltar a local original depois de aplicar ancoragem
	grupoApresentacaoModelo = game.add.sprite(106, 100000, 'grupoApresentacao');
	grupoApresentacao = game.add.sprite(106, 340 + grupoApresentacaoModelo.height/2, 'grupoApresentacao');
	grupoApresentacao.inputEnabled = true;
	grupoApresentacao.events.onInputDown.add(showModalApresentacao, this);
	alinhar(grupoApresentacao, 0, 0.5);

	// GRUPO TRATAMENTOS
	// Modelo para voltar a local original depois de aplicar ancoragem
	grupoTratamentosModelo = game.add.sprite(106, 100000, 'grupoTratamentos');
	grupoTratamentos = game.add.sprite(308, 150, 'grupoTratamentos');
	grupoTratamentos.inputEnabled = true;
	grupoTratamentos.events.onInputDown.add(showModalTratamentos, this);
	alinhar(grupoTratamentos, 0, 0);

	iconeHigiene = reg.modal.getModalItem("modalTratamentos", 2);
	iconeHigiene.inputEnabled = true;
	iconeHigiene.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeHigiene');}, this);
	alinhar(iconeHigiene, 0.5, 0.5);

	iconeRemedio = reg.modal.getModalItem("modalTratamentos", 3);
	iconeRemedio.inputEnabled = true;
	iconeRemedio.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeRemedio');}, this);
	alinhar(iconeRemedio, 0.5, 0.5);

	iconeFono = reg.modal.getModalItem("modalTratamentos", 4);
	iconeFono.inputEnabled = true;
	iconeFono.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeFono');}, this);
	alinhar(iconeFono, 0.5, 0.5);

	iconeCirugia = reg.modal.getModalItem("modalTratamentos", 5);
	iconeCirugia.inputEnabled = true;
	iconeCirugia.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeCirugia');}, this);
	alinhar(iconeCirugia, 0.5, 0.5);

	iconeIntraoral = reg.modal.getModalItem("modalTratamentos", 6);
	iconeIntraoral.inputEnabled = true;
	iconeIntraoral.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeIntraoral');}, this);
	alinhar(iconeIntraoral, 0.5, 0.5);

	iconeCpap = reg.modal.getModalItem("modalTratamentos", 7);
	iconeCpap.inputEnabled = true;
	iconeCpap.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeCpap');}, this);
	alinhar(iconeCpap, 0.5, 0.5);

	// GRUPO CPAP
	// Modelo para voltar a local original depois de aplicar ancoragem
	grupoCpapModelo = game.add.sprite(106, 100000, 'grupoCpap');
	grupoCpap = game.add.sprite(580 + grupoCpapModelo.width, 150, 'grupoCpap');
	grupoCpap.inputEnabled = true;
	grupoCpap.events.onInputDown.add(showModalCpap, this);
	alinhar(grupoCpap, 1, 0);

	// GRUPO PERGUNTAS
	// Modelo para voltar a local original depois de aplicar ancoragem
	grupoPerguntaModelo = game.add.sprite(106, 100000, 'grupoPerguntas');
	grupoPerguntas = game.add.sprite(762 + grupoPerguntaModelo.width, 340 + grupoPerguntaModelo.height/2, 'grupoPerguntas');
	grupoPerguntas.inputEnabled = true;
	grupoPerguntas.events.onInputDown.add(showModalPerguntas, this);
	alinhar(grupoPerguntas, 1, 0.5);
	frameResposta = game.add.sprite(106, 100000, 'frameResposta');
	frameResposta.alpha = 0;
	celular = game.add.sprite(106, 100000, 'celular');

	// Modal CPAP
	// Aparelho e personagens original para retornar ao tamanho normal
	aparelhoCpapOriginal = game.add.sprite(1000, 10000, 'aparelhoCpap');
	personagemErradoCpapOriginal =  game.add.sprite(1000, 10000, 'personagemErradoCpap');

	personagemErradoCpap = reg.modal.getModalItem("modalCpap", 2);
	personagemErradoCpap.x = 690;
	personagemErradoCpap.y = 150;
	personagemErradoCpap.animations.add('run');
	personagemErradoCpap.animations.play('run', 15, true);
	personagemErradoCpap.inputEnabled = true;

	personagemCertoCpap = reg.modal.getModalItem("modalCpap", 3);
	personagemCertoCpap.animations.add('run');
	personagemCertoCpap.y = 1000;
	personagemCertoCpap.animations.play('run', 15, true);
	personagemCertoCpap.inputEnabled = true;

	aparelhoCpap = reg.modal.getModalItem("modalCpap", 4);
	aparelhoCpap.inputEnabled = true;

	botaoPlay = reg.modal.getModalItem("modalCpap", 5);
	botaoPlay.inputEnabled = true;
	botaoPlay.x = 800;
	botaoPlay.y = 480;

	textoArrasteCpap = reg.modal.getModalItem("modalCpap", 6);
	textoArrasteCpap.alpha = 0;

	// ANIMACAO - Cria animacao com 5 frames
	engasgo = reg.modal.getModalItem("modalApresentacao", 2);
	engasgo.animations.add('run');
	engasgo.inputEnabled = true;

	faltaConcentracao = reg.modal.getModalItem("modalApresentacao", 3);
	faltaConcentracao.animations.add('run');
	faltaConcentracao.inputEnabled = true;

	ronco = reg.modal.getModalItem("modalApresentacao", 4);
	ronco.animations.add('run');
	ronco.inputEnabled = true;

	sonoNaoRestaurador	= reg.modal.getModalItem("modalApresentacao", 5);
	sonoNaoRestaurador.animations.add('run');
	sonoNaoRestaurador.inputEnabled = true;

	sonolencia = reg.modal.getModalItem("modalApresentacao", 6);
	sonolencia.animations.add('run');
	sonolencia.inputEnabled = true;

	fadiga = reg.modal.getModalItem("modalApresentacao", 7);
	fadiga.animations.add('run');
	fadiga.inputEnabled = true;

	respiracaoApneia = reg.modal.getModalItem("modalApresentacao", 8);
	respiracaoApneia.animations.add('run');
	respiracaoApneia.animations.play('run', 6, true);

	respiracaoCorreta = reg.modal.getModalItem("modalApresentacao", 9);
	respiracaoCorreta.animations.add('run');
	respiracaoCorreta.animations.play('run', 7, true);
}

function update () {

	// console.log(iconeCpap.x + " - " + iconeCpap.y);
	// Verificadores animação tela Tratamentos - Início
	if(iconeCpap.x == 874.5 && iconeCpap.y == 295.5) {
		fimPrimeiroClique = true;
	}

	if(fimPrimeiroClique == true) {
		if(textoRemedio.alpha   > 0 && textoRemedio.alpha   < 1 || 
		   textoHigiene.alpha   > 0 && textoHigiene.alpha   < 1 || 
		   textoCirugia.alpha   > 0 && textoCirugia.alpha   < 1 || 
		   textoFono.alpha      > 0 && textoFono.alpha      < 1 || 
		   textoIntraoral.alpha > 0 && textoIntraoral.alpha < 1 || 
		   textoCpapTrat.alpha  > 0 && textoCpapTrat.alpha  < 1) {
				transicao = true; // Enquanto estiver no Fade In dos textos
		} else if(iconeCpap.x == 874.5 && iconeCpap.y == 295.5) { // Fim da animação que move os icones
			transicao = false;
		}
	}
	//Verificadores animação tela Tratamentos - Fim

	if (frameResposta.alpha > 0) {
		fimPrimeiroCliqueDuvidas = true;
	}

	if(fimPrimeiroCliqueDuvidas){
		if(pergunta1Balao1.alpha > 0 && pergunta1Balao1.alpha < 1 ||
		   pergunta1Balao2.alpha > 0 && pergunta1Balao2.alpha < 1 ||
		   pergunta1Balao3.alpha > 0 && pergunta1Balao3.alpha < 1 ||
		   pergunta1Balao4.alpha > 0 && pergunta1Balao4.alpha < 1 ||
		   pergunta2Balao1.alpha > 0 && pergunta2Balao1.alpha < 1 ||
		   pergunta2Balao2.alpha > 0 && pergunta2Balao2.alpha < 1 ||
		   pergunta2Balao3.alpha > 0 && pergunta2Balao3.alpha < 1 ||
		   pergunta3Balao1.alpha > 0 && pergunta3Balao1.alpha < 1 ||
		   pergunta3Balao2.alpha > 0 && pergunta3Balao2.alpha < 1 ||
		   pergunta3Balao3.alpha > 0 && pergunta3Balao3.alpha < 1 ||
		   pergunta4Balao1.alpha > 0 && pergunta4Balao1.alpha < 1 ||
		   pergunta4Balao2.alpha > 0 && pergunta4Balao2.alpha < 1 ||
		   pergunta4Balao3.alpha > 0 && pergunta4Balao3.alpha < 1 ||
		   pergunta5Balao1.alpha > 0 && pergunta5Balao1.alpha < 1 ||
		   pergunta5Balao2.alpha > 0 && pergunta5Balao2.alpha < 1 ||
		   pergunta5Balao3.alpha > 0 && pergunta5Balao3.alpha < 1 ||
		   pergunta6Balao1.alpha > 0 && pergunta6Balao1.alpha < 1 ||
		   pergunta6Balao2.alpha > 0 && pergunta6Balao2.alpha < 1 || 
		   !primeiroCliqueDuvidas && celular.x != 180 && frameResposta.alpha > 0){

				transicaoDuvidas = true;
		} else if (celular.x == 180) {
			transicaoDuvidas = false;
		}
	}
	//Verificadores animação tela Duvidas - Fim

	alteraEscalaImagem(grupoApresentacao, 1.3);
	alteraEscalaImagem(grupoTratamentos, 1.3);
	alteraEscalaImagem(grupoCpap, 1.3);
	alteraEscalaImagem(grupoPerguntas, 1.3);

	alteraEscalaImagem(botaoPlay, 1.2);

	// Limitadores da tela para a máscara no Pop-Up
	if(aparelhoCpap.x < 91 ) aparelhoCpap.x = 91;
	if(aparelhoCpap.x > 760) aparelhoCpap.x = 760;
	if(aparelhoCpap.y < 52 ) aparelhoCpap.y = 52;
	if(aparelhoCpap.y > 429) aparelhoCpap.y = 429;

	// Condição de acoplação de máscara
	if( aparelhoCpap.x < personagemErradoCpap.x + 100 && 
		aparelhoCpap.x > personagemErradoCpap.x - 100 && 
		aparelhoCpap.y < personagemErradoCpap.y + 100 && 
		aparelhoCpap.y > personagemErradoCpap.y - 100 && 
		!mascaraAcoplada)
	{
			mascaraAcoplada = true;
			if(mascaraAcoplada) {
				somRonco.stop();
				aparecePersonagemDormindo();
				desapareceCpap();
			}
	}

	animaIcones(engasgo, 2);
	animaIcones(faltaConcentracao, 2);
	animaIcones(ronco, 2);
	animaIcones(sonoNaoRestaurador, 2);
	animaIcones(sonolencia, 2);
	animaIcones(fadiga, 2);

	alteraEscalaImagem(engasgo, 1.2);
	alteraEscalaImagem(faltaConcentracao, 1.2);
	alteraEscalaImagem(ronco, 1.2);
	alteraEscalaImagem(sonoNaoRestaurador, 1.2);
	alteraEscalaImagem(sonolencia, 1.2);
	alteraEscalaImagem(fadiga, 1.2);

	if (primeiroCliqueTratamentos) {
		alteraEscalaImagem(iconeFono, 1.2);
		alteraEscalaImagem(iconeCpap, 1.15);
		alteraEscalaImagem(iconeIntraoral, 1.2);
		alteraEscalaImagem(iconeCirugia, 1.2);
		alteraEscalaImagem(iconeHigiene, 1.2);
		alteraEscalaImagem(iconeRemedio, 1.2);
	}
}

function controlaSom() {
	if(tocaSom == -1) {
		iconeComSom.inputEnabled = false;
		iconeComSom.alpha = 0;
		somRonco.stop();
		iconeSemSom.inputEnabled = true;
		iconeSemSom.alpha = 1;
	} else {
		iconeComSom.inputEnabled = true;
		iconeComSom.alpha = 1;
		somRonco.play();
		iconeSemSom.inputEnabled = false;
		iconeSemSom.alpha = 0;
	}
}

function createModals() {
	// Modal Apresentação
	reg.modal.createModal({
		type:"modalApresentacao",
		includeBackground: false,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "image",
				content: "bgModal"
			},
			{
				type : "image",
				content: "botaoFecharApresentacao",
				offsetY: -235,
				offsetX: 435,
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "sprite",
				atlasParent: "engasgo"
			},
			{
				type: "sprite",
				atlasParent: "faltaConcentracao"
			},
			{
				type: "sprite",
				atlasParent: "ronco"
			},
			{
				type: "sprite",
				atlasParent: "sonoNaoRestaurador"
			},
			{
				type: "sprite",
				atlasParent: "sonolencia"
			},
			{
				type: "sprite",
				atlasParent: "fadiga"
			},
			{
				type: "sprite",
				atlasParent: "respiracaoApneia"
			},
			{
				type: "sprite",
				atlasParent: "respiracaoCorreta"
			},
			{
				type : "image",
				content: "legendaRespiracaoApneia",
			},
			{
				type : "image",
				content: "legendaRespiracaoCorreta",
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "image",
				content: "tituloAos"
			},
			{
				type: "image",
				content: "tituloSintomas"
			},
			{
				type: "image",
				content: "tituloConsequencia"
			},
			{
				type: "image",
				content: "textoAos"
			},
			{
				type: "image",
				content: "textoConsequencia1"
			},
			{
				type: "image",
				content: "textoConsequencia2"
			},
			{
				type: "image",
				content: "textoConsequencia3"
			}
		]
	});

	// Modal Tratamentos
	reg.modal.createModal({
		type:"modalTratamentos",
		includeBackground: false,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "image",
				content: "bgModal"
			},
			{
				type : "image",
				content: "botaoFecharTratamentos",
				offsetY: -235,
				offsetX: 435,
				callback : function(){
					hideModalTratamentos();
				}
			},
			{
				type: "image",
				content: "iconeHigiene"
			},
			{
				type: "image",
				content: "iconeRemedio"
			},
			{
				type: "image",
				content: "iconeFono"
			},
			{
				type: "image",
				content: "iconeCirugia"
			},
			{
				type: "image",
				content: "iconeIntraoral"
			},
			{
				type: "image",
				content: "iconeCpap"
			},
			{
				type: "image",
				content: "tituloDiagnostico",
			},
			{
				type: "image",
				content: "textoDiagnostico"
			},
			{
				type: "image",
				content: "tituloTratamentos"
			},
			{
				type: "image",
				content: "textoHigiene"
			},
			{
				type: "image",
				content: "textoRemedio"
			},
			{
				type: "image",
				content: "textoFono"
			},
			{
				type: "image",
				content: "textoCirugia"
			},	
			{
				type: "image",
				content: "textoIntraoral"
			},
			{
				type: "image",
				content: "textoCpapTrat"
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					if(fimPrimeiroClique && !transicao || primeiroCliqueTratamentos) {
						hideModalTratamentos();
				 	}
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					if(fimPrimeiroClique && !transicao || primeiroCliqueTratamentos) {
						hideModalTratamentos();
				 	}
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					if(fimPrimeiroClique && !transicao || primeiroCliqueTratamentos) {
						hideModalTratamentos();
				 	}
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					if(fimPrimeiroClique && !transicao || primeiroCliqueTratamentos) {
						hideModalTratamentos();
				 	}
				}
			},
			{
				type: "image",
				content: "linkPolissonografia",
				callback : function(){
					alert("Em breve um vídeo novo. Aguarde.");
					//window.open("https://www.youtube.com/embed/b61ZX2IgOww");
				}
			}
		]
	});

	// Modal Cpap
	reg.modal.createModal({
		type:"modalCpap",
		includeBackground: false,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "image",
				content: "bgModal"
			},
			{
				type : "image",
				content: "botaoFecharCpap",
				offsetY: -235,
				offsetX: 435,
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type: "sprite",
				atlasParent: "personagemErradoCpap"
			},
			{
				type: "sprite",
				atlasParent: "personagemCertoCpap"
			},
			{
				type: "sprite",
				content: "aparelhoCpap",
				offsetY: 108,
				offsetX: -285,
				ondrag : function (){	
					return true;
				}
			},
			{
				type : "image",
				content: "botaoPlay",
				offsetY: 150,
				offsetX: 290,
				callback : function(){
					alert("Em breve um vídeo novo. Aguarde.");
					// window.open("https://www.youtube.com/embed/b61ZX2IgOww");
					// abreJanelaDeVideo();
				}
			},
			{
				type : "image",
				content: "textoArrasteCpap",
				offsetY: 190,
				offsetX: -300
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type : "image",
				content: "tituloCpap"
			},
			{
				type : "image",
				content: "tituloBeneficios"
			},
			{
				type : "image",
				content: "tituloExperimente"
			},
			{
				type : "image",
				content: "textoCpap"
			},
			{
				type : "image",
				content: "textoBeneficios"
			},
			{
				type : "image",
				content: "textoInformacoes"
			}
		]
	});

	// Modal Perguntas
	reg.modal.createModal({
		type:"modalPerguntas",
		includeBackground: false,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "image",
				content: "bgModal"
			},
			{
				type : "image",
				content: "botaoFecharPerguntas",
				offsetY: -235,
				offsetX: 435,
				callback : function(){
					hideModalPerguntas();
				}
			},
			{
				type: "image",
				content: "tituloDuvidas"
			},
			{
				type: "image",
				content: "celular"
			},
			{
				type: "image",
				content: "frameResposta"
			},
			{
				type: "image",
				content: "perguntaLabel"
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					if(fimPrimeiroCliqueDuvidas && !transicaoDuvidas || primeiroCliqueDuvidas) {
						hideModalPerguntas();
				 	}
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					if(fimPrimeiroCliqueDuvidas && !transicaoDuvidas || primeiroCliqueDuvidas) {
						hideModalPerguntas();
					}
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					if(fimPrimeiroCliqueDuvidas && !transicaoDuvidas || primeiroCliqueDuvidas) {
						hideModalPerguntas();
					}
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					if(fimPrimeiroCliqueDuvidas && !transicaoDuvidas || primeiroCliqueDuvidas) {
						hideModalPerguntas();
				 	}
				}
			},
			{
				type: "image",
				content: "pergunta1"
			},
			{
				type: "image",
				content: "pergunta1Balao1"
			},
			{
				type: "image",
				content: "pergunta1Balao2"
			},	
			{
				type: "image",
				content: "pergunta1Balao3"
			},
			{
				type: "image",
				content: "pergunta1Balao4"
			},
			
			{
				type: "image",
				content: "pergunta2"
			},
			{
				type: "image",
				content: "pergunta2Balao1"
			},
			{
				type: "image",
				content: "pergunta2Balao2"
			},
			{
				type: "image",
				content: "pergunta2Balao3"
			},
			
			{
				type: "image",
				content: "pergunta3"
			},
			{
				type: "image",
				content: "pergunta3Balao1"
			},
			{
				type: "image",
				content: "pergunta3Balao2"
			},
			{
				type: "image",
				content: "pergunta3Balao3"
			},
			
			{
				type: "image",
				content: "pergunta4"
			},
			{
				type: "image",
				content: "pergunta4Balao1"
			},
			{
				type: "image",
				content: "pergunta4Balao2"
			},
			{
				type: "image",
				content: "pergunta4Balao3"
			},
			
			{
				type: "image",
				content: "pergunta5"
			},
			{
				type: "image",
				content: "pergunta5Balao1"
			},
			{
				type: "image",
				content: "pergunta5Balao2"
			},
			{
				type: "image",
				content: "pergunta5Balao3"
			},
			
			{
				type: "image",
				content: "pergunta6"
			},
			{
				type: "image",
				content: "pergunta6Balao1"
			},
			{
				type: "image",
				content: "pergunta6Balao2",
				callback : function(){
					if (pergunta6Balao2.alpha == 1) {
						window.open("https://www.youtube.com/embed/b61ZX2IgOww");
					}
				}
			}
		]
	});

	// Modal Creditos
	reg.modal.createModal({
		type:"modalCreditos",
		includeBackground: false,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "image",
				content: "bgModal"
			},
			{
				type : "image",
				content: "botaoFecharCreditos",
				offsetY: -235,
				offsetX: 435,
				callback : function(){
					hideModalCreditos();
				}
			},
			{
				type : "image",
				content: "textoCreditos",
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalCreditos();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalCreditos();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalCreditos();
				}
			},
			{
				type: "image",
				content: "invi",
				callback : function(){
					hideModalCreditos();
				}
			}
		]
	});
}

function abreJanelaDeVideo() {
	telaCinzaVideo = game.add.image(35, 32, "telaCinzaVideo");
	telaCinzaVideo.alpha = 0.5;
	telaCinzaVideo.inputEnabled = true;
	telaCinzaVideo.events.onInputDown.add(function() {
		document.getElementById("modal").removeChild(janelaVideo);
		telaCinzaVideo.inputEnabled = false;
		telaCinzaVideo.alpha = 0;
	}, this);

	var janelaVideo = document.createElement("iframe");
		janelaVideo.src = "https://www.youtube.com/embed/b61ZX2IgOww";
		janelaVideo.width = 640;
		janelaVideo.height = 360;
		janelaVideo.frameborder = 1;
		janelaVideo.allowfullscreen = true;
		document.getElementById("modal").appendChild(janelaVideo);
}

// Modal #1 - Apresentação
function showModalApresentacao(){
	//Chama-se o tamanho da tela para basear os calculos e depois aplica na função limites
	telaApresentacao = reg.modal.getModalItem("modalApresentacao", 0);
	limites("modalApresentacao", 12, 13, 14, 15, telaApresentacao, 10);
	desabilitaTodasOvelhas();
	somRonco.stop();
	telaPrincipal.alpha = 0.7;

	telaAos   = reg.modal.getModalItem("modalApresentacao", 0);
	telaAos.y = 80;

	tituloAos   = reg.modal.getModalItem("modalApresentacao", 16);
	tituloAos.x = 120;
	tituloAos.y = 100;

	tituloSintomas   = reg.modal.getModalItem("modalApresentacao", 17);
	tituloSintomas.x = 380;
	tituloSintomas.y = 100;

	tituloConsequencia   = reg.modal.getModalItem("modalApresentacao", 18);
	tituloConsequencia.x = 680;
	tituloConsequencia.y = 100;

	textoAos   = reg.modal.getModalItem("modalApresentacao", 19);
	textoAos.x = 120;
	textoAos.y = 150;

	textoConsequencia1   = reg.modal.getModalItem("modalApresentacao", 20);
	textoConsequencia1.x = 680;
	textoConsequencia1.y = 150;

	textoConsequencia2   = reg.modal.getModalItem("modalApresentacao", 21);
	textoConsequencia2.x = 680;
	textoConsequencia2.y = 280;

	textoConsequencia3   = reg.modal.getModalItem("modalApresentacao", 22);
	textoConsequencia3.x = 680;
	textoConsequencia3.y = 355;

	legendaRespiracaoApneia   = reg.modal.getModalItem("modalApresentacao", 10);
	legendaRespiracaoApneia.x = 120;
	legendaRespiracaoApneia.y = 260;

	respiracaoApneia.x = 120;
	respiracaoApneia.y = 266;

	legendaRespiracaoCorreta   = reg.modal.getModalItem("modalApresentacao", 11);
	legendaRespiracaoCorreta.x = 120;
	legendaRespiracaoCorreta.y = 400;

	respiracaoCorreta.x = 115;
	respiracaoCorreta.y = 400;

	engasgo.x = 385 + engasgo.width/2;
	engasgo.y = 150 + engasgo.height/2;
	alinhar(engasgo, 0.5, 0.5);

	faltaConcentracao.x = 510 + faltaConcentracao.width/2;
	faltaConcentracao.y = 150 + faltaConcentracao.height/2;
	alinhar(faltaConcentracao, 0.5, 0.5);

	ronco.x = 385 + ronco.width/2;
	ronco.y = 280 + ronco.height/2;
	alinhar(ronco, 0.5, 0.5);

	sonoNaoRestaurador.x = 510 + sonoNaoRestaurador.width/2;
	sonoNaoRestaurador.y = 280 + sonoNaoRestaurador.height/2;
	alinhar(sonoNaoRestaurador, 0.5, 0.5);

	sonolencia.x = 385 + sonolencia.width/2;
	sonolencia.y = 410 + sonolencia.height/2;
	alinhar(sonolencia, 0.5, 0.5);

	fadiga.x = 510 + fadiga.width/2;
	fadiga.y = 410 + fadiga.height/2;
	alinhar(fadiga, 0.5, 0.5);

	reg.modal.showModal("modalApresentacao");
}

function hideModalApresentacao(){
	habilitaTodasOvelhas();
	telaPrincipal.alpha = 1;
	reg.modal.hideModal("modalApresentacao");
}

// Modal #2 - Tratamentos
function showModalTratamentos(){
	telaTratamentos = reg.modal.getModalItem("modalTratamentos", 0);
	limites("modalTratamentos", 17, 18, 19, 20, telaTratamentos, 10);
	desabilitaTodasOvelhas();
	somRonco.stop();
	telaPrincipal.alpha = 0.7;

	reiniciaIconesTratamentos();

	telaTratamentos = reg.modal.getModalItem("modalTratamentos", 0);
	telaTratamentos.y = 80;

	tituloDiagnostico = reg.modal.getModalItem("modalTratamentos", 8);
	tituloDiagnostico.x = 120;
	tituloDiagnostico.y = 100;

	textoDiagnostico = reg.modal.getModalItem("modalTratamentos", 9);
	textoDiagnostico.x = 120;
	textoDiagnostico.y = 150;

	tituloTratamento = reg.modal.getModalItem("modalTratamentos", 10);
	tituloTratamento.x = 510;
	tituloTratamento.y = 100;

	textoHigiene = reg.modal.getModalItem("modalTratamentos", 11);
	textoHigiene.x = 510;
	textoHigiene.y = 365;
	textoHigiene.alpha = 0;

	textoRemedio = reg.modal.getModalItem("modalTratamentos", 12);
	textoRemedio.x = 510;
	textoRemedio.y = 365;
	textoRemedio.alpha = 0;

	textoFono = reg.modal.getModalItem("modalTratamentos", 13);
	textoFono.x = 510;
	textoFono.y = 365;
	textoFono.alpha = 0;

	textoCirugia = reg.modal.getModalItem("modalTratamentos", 14);
	textoCirugia.x = 510;
	textoCirugia.y = 365;
	textoCirugia.alpha = 0;

	textoIntraoral = reg.modal.getModalItem("modalTratamentos", 15);
	textoIntraoral.x = 510;
	textoIntraoral.y = 365;
	textoIntraoral.alpha = 0;

	textoCpapTrat = reg.modal.getModalItem("modalTratamentos", 16);
	textoCpapTrat.x = 510;
	textoCpapTrat.y = 365;
	textoCpapTrat.alpha = 0;
	
	linkPolissonografia = reg.modal.getModalItem("modalTratamentos", 21);
	linkPolissonografia.x = 120;
	linkPolissonografia.y = 510;

	reg.modal.showModal("modalTratamentos");
}

function hideModalTratamentos(){
	telaPrincipal.alpha = 1;
	habilitaTodasOvelhas();

	telaPrincipal.alpha = 1;
	reg.modal.hideModal("modalTratamentos");

	// No primeiro clique demorar a começar o fade in na tela tratamentos
	fimPrimeiroClique = false;
	transicao = false;

	reiniciaIconesTratamentos();
}

// Modal Cpap
function showModalCpap(){
	telaCpap = reg.modal.getModalItem("modalCpap", 0);
	limites("modalCpap", 7, 8, 9, 10, telaCpap, 10);
	desabilitaTodasOvelhas();

	telaPrincipal.alpha = 0.7;

	telaCpap.y = 80;

	tituloCpap = reg.modal.getModalItem("modalCpap", 11);
	tituloCpap.x = 120;
	tituloCpap.y = 100;

	tituloBeneficios = reg.modal.getModalItem("modalCpap", 12);
	tituloBeneficios.x = 440;
	tituloBeneficios.y = 100;

	tituloExperimente = reg.modal.getModalItem("modalCpap", 13);
	tituloExperimente.x = 735;
	tituloExperimente.y = 100;

	textoCpap = reg.modal.getModalItem("modalCpap", 14);
	textoCpap.x = 120;
	textoCpap.y = 150;

	textoBeneficios = reg.modal.getModalItem("modalCpap", 15);
	textoBeneficios.x = 440;
	textoBeneficios.y = 150;

	textoInformacoes = reg.modal.getModalItem("modalCpap", 16);
	textoInformacoes.x = 735;
	textoInformacoes.y = 420;

	aparelhoCpap.alpha = 0.1;
	tween = game.add.tween(aparelhoCpap).to( { alpha: 1 }, 1000, "Linear", true, 100);
	tween.onComplete.add(function() {
		textoArrasteCpap.alpha = 1;
	}, this);

	reg.modal.showModal("modalCpap");
}

// Função que faz popup desaparecer e coloca os valores no padrão
function hideModalCpap(){
	habilitaTodasOvelhas();
	telaPrincipal.alpha = 1;
	reg.modal.hideModal("modalCpap");

	mascaraAcoplada = false;
	textoArrasteCpap.alpha = 0;
	apareceCpap();
	desaparecePersonagem();
}

function mostraFrameDeRespostas(perguntaClicada) {
	if(primeiroCliqueDuvidas) {
		primeiroCliqueDuvidas = false;

		tween = game.add.tween(celular);
		tween.to({ x: [celular.x, celular.x, 180, 180], y: [celular.y, celular.y, celular.y, celular.y] }, 1000, "Linear");
		tween.start();

		tween = game.add.tween(pergunta1);
		tween.to({ x: [pergunta1.x, pergunta1.x, 191, 191], y: [pergunta1.y, pergunta1.y, pergunta1.y, pergunta1.y] }, 1000, "Linear");
		tween.start();

		tween = game.add.tween(pergunta2);
		tween.to({ x: [pergunta2.x, pergunta2.x, 191, 191], y: [pergunta2.y, pergunta2.y, pergunta2.y, pergunta2.y] }, 1000, "Linear");
		tween.start();

		tween = game.add.tween(pergunta3);
		tween.to({ x: [pergunta3.x, pergunta3.x, 191, 191], y: [pergunta3.y, pergunta3.y, pergunta3.y, pergunta3.y] }, 1000, "Linear");
		tween.start();

		tween = game.add.tween(pergunta4);
		tween.to({ x: [pergunta4.x, pergunta4.x, 191, 191], y: [pergunta4.y, pergunta4.y, pergunta4.y, pergunta4.y] }, 1000, "Linear");
		tween.start();

		tween = game.add.tween(pergunta5);
		tween.to({ x: [pergunta5.x, pergunta5.x, 191, 191], y: [pergunta5.y, pergunta5.y, pergunta5.y, pergunta5.y] }, 1000, "Linear");
		tween.start();

		tween = game.add.tween(pergunta6);
		tween.to({ x: [pergunta6.x, pergunta6.x, 191, 191], y: [pergunta6.y, pergunta6.y, pergunta6.y, pergunta6.y] }, 1000, "Linear");
		tween.start();

		tween = game.add.tween(frameResposta);
		tween.to( { alpha: 1 }, 3000, "Linear", true);
		tween.start();

		tween = game.add.tween(perguntaLabel);
		tween.to( { alpha: 1 }, 3000, "Linear", true);
		tween.start();
	}

	if(perguntaClicada === 'pergunta1' && !transicaoDuvidas) {
		reiniciaBaloesDeDuvidas();

		tween = game.add.tween(pergunta1Balao1);
		tween.to( { alpha: 1 }, 1500, "Linear", 0);
		tween.start();

		tween.onComplete.add(function() {
			tween = game.add.tween(pergunta1Balao2);
			tween.to( { alpha: 1 }, 1500, "Linear", 0);
			tween.start();

			tween.onComplete.add(function() {
				tween = game.add.tween(pergunta1Balao3);
				tween.to( { alpha: 1 }, 1500, "Linear", 0);
				tween.start();

				tween.onComplete.add(function() {
					tween = game.add.tween(pergunta1Balao4);
					tween.to( { alpha: 1 }, 1500, "Linear", 0);
					tween.start();
				}, this);
			}, this);
		}, this);

		pergunta1.alpha = 1;
		pergunta2.alpha = 0.5;
		pergunta3.alpha = 0.5;
		pergunta4.alpha = 0.5;
		pergunta5.alpha = 0.5;
		pergunta6.alpha = 0.5;

	} else if(perguntaClicada === 'pergunta2' && !transicaoDuvidas) {
		reiniciaBaloesDeDuvidas();

		tween = game.add.tween(pergunta2Balao1);
		tween.to( { alpha: 1 }, 1500, "Linear", 0);
		tween.start();

		tween.onComplete.add(function() {
			tween = game.add.tween(pergunta2Balao2);
			tween.to( { alpha: 1 }, 1500, "Linear", 0);
			tween.start();

			tween.onComplete.add(function() {
				tween = game.add.tween(pergunta2Balao3);
				tween.to( { alpha: 1 }, 1500, "Linear", 0);
				tween.start();
			}, this);
		}, this);

		pergunta1.alpha = 0.5;
		pergunta2.alpha = 1;
		pergunta3.alpha = 0.5;
		pergunta4.alpha = 0.5;
		pergunta5.alpha = 0.5;
		pergunta6.alpha = 0.5;

	} else if(perguntaClicada === 'pergunta3' && !transicaoDuvidas) {
		reiniciaBaloesDeDuvidas();

		tween = game.add.tween(pergunta3Balao1);
		tween.to( { alpha: 1 }, 1500, "Linear", true);
		tween.start();

		tween.onComplete.add(function() {
			tween = game.add.tween(pergunta3Balao2);
			tween.to( { alpha: 1 }, 1500, "Linear", true);
			tween.start();

			tween.onComplete.add(function() {
				tween = game.add.tween(pergunta3Balao3);
				tween.to( { alpha: 1 }, 1500, "Linear", true);
				tween.start();
			}, this);
		}, this);

		pergunta1.alpha = 0.5;
		pergunta2.alpha = 0.5;
		pergunta3.alpha = 1;
		pergunta4.alpha = 0.5;
		pergunta5.alpha = 0.5;
		pergunta6.alpha = 0.5;

	} else if(perguntaClicada === 'pergunta4' && !transicaoDuvidas) {
		reiniciaBaloesDeDuvidas();

		tween = game.add.tween(pergunta4Balao1);
		tween.to( { alpha: 1 }, 1500, "Linear", true);
		tween.start();

		tween.onComplete.add(function() {
			tween = game.add.tween(pergunta4Balao2);
			tween.to( { alpha: 1 }, 1500, "Linear", true);
			tween.start();

			tween.onComplete.add(function() {
				tween = game.add.tween(pergunta4Balao3);
				tween.to( { alpha: 1 }, 1500, "Linear", true);
				tween.start();
			}, this);
		}, this);

		pergunta1.alpha = 0.5;
		pergunta2.alpha = 0.5;
		pergunta3.alpha = 0.5;
		pergunta4.alpha = 1;
		pergunta5.alpha = 0.5;
		pergunta6.alpha = 0.5;

	} else if(perguntaClicada === 'pergunta5' && !transicaoDuvidas) {
		reiniciaBaloesDeDuvidas();

		tween = game.add.tween(pergunta5Balao1);
		tween.to( { alpha: 1 }, 1500, "Linear", true);
		tween.start();

		tween.onComplete.add(function() {
			tween = game.add.tween(pergunta5Balao2);
			tween.to( { alpha: 1 }, 1500, "Linear", true);
			tween.start();

			tween.onComplete.add(function() {
				tween = game.add.tween(pergunta5Balao3);
				tween.to( { alpha: 1 }, 1500, "Linear", true);
				tween.start();
			}, this);
		}, this);

		pergunta1.alpha = 0.5;
		pergunta2.alpha = 0.5;
		pergunta3.alpha = 0.5;
		pergunta4.alpha = 0.5;
		pergunta5.alpha = 1;
		pergunta6.alpha = 0.5;

	} else if(perguntaClicada === 'pergunta6' && !transicaoDuvidas) {
		reiniciaBaloesDeDuvidas();

		tween = game.add.tween(pergunta6Balao1);
		tween.to( { alpha: 1 }, 1500, "Linear", true);
		tween.start();

		tween.onComplete.add(function() {
			tween = game.add.tween(pergunta6Balao2);
			tween.to( { alpha: 1 }, 1500, "Linear", true);
			tween.start();
		}, this);

		pergunta1.alpha = 0.5;
		pergunta2.alpha = 0.5;
		pergunta3.alpha = 0.5;
		pergunta4.alpha = 0.5;
		pergunta5.alpha = 0.5;
		pergunta6.alpha = 1;
	}
}

function reiniciaBaloesDeDuvidas() {
	pergunta1.alpha = 1;
	pergunta2.alpha = 1;
	pergunta3.alpha = 1;
	pergunta4.alpha = 1;
	pergunta5.alpha = 1;
	pergunta6.alpha = 1;
	pergunta1Balao1.alpha = 0;
	pergunta1Balao2.alpha = 0;
	pergunta1Balao3.alpha = 0;
	pergunta1Balao4.alpha = 0;
	pergunta2Balao1.alpha = 0;
	pergunta2Balao2.alpha = 0;
	pergunta2Balao3.alpha = 0;
	pergunta3Balao1.alpha = 0;
	pergunta3Balao2.alpha = 0;
	pergunta3Balao3.alpha = 0;
	pergunta4Balao1.alpha = 0;
	pergunta4Balao2.alpha = 0;
	pergunta4Balao3.alpha = 0;
	pergunta5Balao1.alpha = 0;
	pergunta5Balao2.alpha = 0;
	pergunta5Balao3.alpha = 0;
	pergunta6Balao1.alpha = 0;
	pergunta6Balao2.alpha = 0;
}

// Modal Perguntas
function showModalPerguntas(){
	telaPerguntas = reg.modal.getModalItem("modalPerguntas", 0);
	limites("modalPerguntas", 6, 7, 8, 9, telaPerguntas, 10);
	desabilitaTodasOvelhas();
	somRonco.stop();
	telaPrincipal.alpha = 0.7;

	telaPerguntas.y = 80;

	tituloDuvidas = reg.modal.getModalItem("modalPerguntas", 2);
	tituloDuvidas.x = 458;
	tituloDuvidas.y = 100;

	celular = reg.modal.getModalItem("modalPerguntas", 3);
	celular.x = 413;
	celular.y = 150;

	frameResposta = reg.modal.getModalItem("modalPerguntas", 4);
	frameResposta.x = 410;
	frameResposta.y = 150;
	frameResposta.alpha = 0;

	perguntaLabel = reg.modal.getModalItem("modalPerguntas", 5);
	perguntaLabel.x = 440;
	perguntaLabel.y = 155;
	perguntaLabel.alpha = 0;

	pergunta1 = reg.modal.getModalItem("modalPerguntas", 10);
	pergunta1.x = 424;
	pergunta1.y = 220;
	pergunta1.inputEnabled = true;
	pergunta1.events.onInputDown.add(function() {mostraFrameDeRespostas('pergunta1');}, this);

	pergunta1Balao1 = reg.modal.getModalItem("modalPerguntas", 11);
	pergunta1Balao1.x = 505;
	pergunta1Balao1.y = 205;
	pergunta1Balao1.alpha = 0;

	pergunta1Balao2 = reg.modal.getModalItem("modalPerguntas", 12);
	pergunta1Balao2.x = 470;
	pergunta1Balao2.y = 270;
	pergunta1Balao2.alpha = 0;

	pergunta1Balao3 = reg.modal.getModalItem("modalPerguntas", 13);
	pergunta1Balao3.x = 470;
	pergunta1Balao3.y = 352;
	pergunta1Balao3.alpha = 0;

	pergunta1Balao4 = reg.modal.getModalItem("modalPerguntas", 14);
	pergunta1Balao4.x = 470;
	pergunta1Balao4.y = 435;
	pergunta1Balao4.alpha = 0;

	pergunta2 = reg.modal.getModalItem("modalPerguntas", 15);
	pergunta2.x = 424;
	pergunta2.y = 263;
	pergunta2.inputEnabled = true;
	pergunta2.events.onInputDown.add(function() {mostraFrameDeRespostas('pergunta2');}, this);

	pergunta2Balao1 = reg.modal.getModalItem("modalPerguntas", 16);
	pergunta2Balao1.x = 505;
	pergunta2Balao1.y = 205;
	pergunta2Balao1.alpha = 0;

	pergunta2Balao2 = reg.modal.getModalItem("modalPerguntas", 17);
	pergunta2Balao2.x = 470;
	pergunta2Balao2.y = 270;
	pergunta2Balao2.alpha = 0;

	pergunta2Balao3 = reg.modal.getModalItem("modalPerguntas", 18);
	pergunta2Balao3.x = 470;
	pergunta2Balao3.y = 375;
	pergunta2Balao3.alpha = 0;

	pergunta3 = reg.modal.getModalItem("modalPerguntas", 19);
	pergunta3.x = 424;
	pergunta3.y = 306;
	pergunta3.inputEnabled = true;
	pergunta3.events.onInputDown.add(function() {mostraFrameDeRespostas('pergunta3');}, this);

	pergunta3Balao1 = reg.modal.getModalItem("modalPerguntas", 20);
	pergunta3Balao1.x = 505;
	pergunta3Balao1.y = 205;
	pergunta3Balao1.alpha = 0;

	pergunta3Balao2 = reg.modal.getModalItem("modalPerguntas", 21);
	pergunta3Balao2.x = 470;
	pergunta3Balao2.y = 270;
	pergunta3Balao2.alpha = 0;

	pergunta3Balao3 = reg.modal.getModalItem("modalPerguntas", 22);
	pergunta3Balao3.x = 470;
	pergunta3Balao3.y = 405;
	pergunta3Balao3.alpha = 0;

	pergunta4 = reg.modal.getModalItem("modalPerguntas", 23);
	pergunta4.x = 424;
	pergunta4.y = 349;
	pergunta4.inputEnabled = true;
	pergunta4.events.onInputDown.add(function() {mostraFrameDeRespostas('pergunta4');}, this);

	pergunta4Balao1 = reg.modal.getModalItem("modalPerguntas", 24);
	pergunta4Balao1.x = 505;
	pergunta4Balao1.y = 205;
	pergunta4Balao1.alpha = 0;

	pergunta4Balao2 = reg.modal.getModalItem("modalPerguntas", 25);
	pergunta4Balao2.x = 470;
	pergunta4Balao2.y = 250;
	pergunta4Balao2.alpha = 0;

	pergunta4Balao3 = reg.modal.getModalItem("modalPerguntas", 26);
	pergunta4Balao3.x = 470;
	pergunta4Balao3.y = 385;
	pergunta4Balao3.alpha = 0;

	pergunta5 = reg.modal.getModalItem("modalPerguntas", 27);
	pergunta5.x = 424;
	pergunta5.y = 392;
	pergunta5.inputEnabled = true;
	pergunta5.events.onInputDown.add(function() {mostraFrameDeRespostas('pergunta5');}, this);

	pergunta5Balao1 = reg.modal.getModalItem("modalPerguntas", 28);
	pergunta5Balao1.x = 505;
	pergunta5Balao1.y = 205;
	pergunta5Balao1.alpha = 0;

	pergunta5Balao2 = reg.modal.getModalItem("modalPerguntas", 29);
	pergunta5Balao2.x = 470;
	pergunta5Balao2.y = 250;
	pergunta5Balao2.alpha = 0;

	pergunta5Balao3 = reg.modal.getModalItem("modalPerguntas", 30);
	pergunta5Balao3.x = 470;
	pergunta5Balao3.y = 355;
	pergunta5Balao3.alpha = 0;

	pergunta6 = reg.modal.getModalItem("modalPerguntas", 31);
	pergunta6.x = 424;
	pergunta6.y = 435;
	pergunta6.inputEnabled = true;
	pergunta6.events.onInputDown.add(function() {mostraFrameDeRespostas('pergunta6');}, this);

	pergunta6Balao1 = reg.modal.getModalItem("modalPerguntas", 32);
	pergunta6Balao1.x = 505;
	pergunta6Balao1.y = 205;
	pergunta6Balao1.alpha = 0;

	pergunta6Balao2 = reg.modal.getModalItem("modalPerguntas", 33);
	pergunta6Balao2.x = 470;
	pergunta6Balao2.y = 250;
	pergunta6Balao2.alpha = 0;

	reg.modal.showModal("modalPerguntas");
}

function hideModalPerguntas(){
	habilitaTodasOvelhas();
	telaPrincipal.alpha = 1;
	primeiroCliqueDuvidas = true;
	fimPrimeiroCliqueDuvidas = false;
	reiniciaBaloesDeDuvidas();

	reg.modal.hideModal("modalPerguntas");
}

function showModalCreditos(){
	telaCreditos = reg.modal.getModalItem("modalCreditos", 0);
	limites("modalCreditos", 3, 4, 5, 6, telaCreditos, 10);
	desabilitaTodasOvelhas();
	somRonco.stop();
	telaPrincipal.alpha = 0.7;

	telaCreditos.y = 80;

	textoCreditos = reg.modal.getModalItem("modalCreditos", 2);
	textoCreditos.x = 280;
	textoCreditos.y = 120;

	reg.modal.showModal("modalCreditos");
}

function hideModalCreditos(){
	habilitaTodasOvelhas();
	telaPrincipal.alpha = 1;
	reg.modal.hideModal("modalCreditos");
}

// Função que faz personagem aparece
function aparecePersonagemDormindo(){
	personagemCertoCpap.x = 690;
	personagemCertoCpap.y = 150;
}

// Função que faz com que o personagem acordado desapareça junto com a máscara
function desapareceCpap(){
	aparelhoCpap.width = 0;
	aparelhoCpap.height = 0;

	textoArrasteCpap.alpha = 0;

	personagemErradoCpap.width = 0;
	personagemErradoCpap.height = 0;
}

function apareceCpap() {
	aparelhoCpap.x = 120;
	aparelhoCpap.y = 350;
	aparelhoCpap.width  = aparelhoCpapOriginal.width;
	aparelhoCpap.height = aparelhoCpapOriginal.height;

	aparelhoCpap.alpha = 0.1;
	tween = game.add.tween(aparelhoCpap).to( { alpha: 1 }, 2000, "Linear", true, 2000);
	tween.onComplete.add(function() {
		textoArrasteCpap.alpha = 1;
	}, this);

	personagemErradoCpap.width  = personagemErradoCpapOriginal.width;
	personagemErradoCpap.height = personagemErradoCpapOriginal.height;
}

function desaparecePersonagem(){
	personagemCertoCpap.y = 10000;
}

function desabilitaTodasOvelhas() {
	grupoApresentacao.inputEnabled = false;
	grupoTratamentos.inputEnabled  = false;
	grupoCpap.inputEnabled         = false;
	grupoPerguntas.inputEnabled    = false;
}

function habilitaTodasOvelhas() {
	controlaSom();
	grupoApresentacao.inputEnabled = true;
	grupoTratamentos.inputEnabled  = true;
	grupoCpap.inputEnabled         = true;
	grupoPerguntas.inputEnabled    = true;
}

function rearranjaIconesTratamentos(iconeClicado) {

	if(primeiroCliqueTratamentos === true ) {
		tweenHigiene = game.add.tween(iconeHigiene);
		tweenHigiene.to({ x: [iconeHigiene.x - 20, iconeHigiene.x - 20, iconeHigiene.x - 20, iconeHigiene.x - 20], y: [120 + higieneY, 120 + higieneY, 120 + higieneY, 120 + higieneY] }, 3000, "Linear");
		tweenHigiene.start();
		tweenHigiene = game.add.tween(iconeHigiene.scale).to( { x: 0.60, y: 0.60 }, 1000, Phaser.Easing.Elastic.Out, true);

		tweenFono = game.add.tween(iconeFono);
		tweenFono.to({ x: [iconeFono.x, iconeFono.x, 631 + fonoX, 631 + fonoX], y: [120 + fonoY, 120 + fonoY, 120 + fonoY, 120 + fonoY] }, 3000, "Linear");
		tweenFono.start();
		tweenFono = game.add.tween(iconeFono.scale).to( { x: 0.60, y: 0.60 }, 1000, Phaser.Easing.Elastic.Out, true);

		tweenRemedio = game.add.tween(iconeRemedio);
		tweenRemedio.to({ x: [iconeRemedio.x, iconeRemedio.x, 814 + remedioX, 814 + remedioX], y: [120 + remedioY, 120 + remedioY, 120 + remedioY, 120 + remedioY] }, 3000, "Linear");
		tweenRemedio.start();
		tweenRemedio = game.add.tween(iconeRemedio.scale).to( { x: 0.60, y: 0.60 }, 1000, Phaser.Easing.Elastic.Out, true);

		tweenCirurgia = game.add.tween(iconeCirugia);
		tweenCirurgia.to({ x: [iconeCirugia.x - 20, iconeCirugia.x - 20, iconeCirugia.x - 20, iconeCirugia.x - 20], y: [iconeCirugia.y, iconeCirugia.y, 220 + cirurgiaY, 220 + cirurgiaY] }, 3000, "Linear");
		tweenCirurgia.start();
		tweenCirurgia = game.add.tween(iconeCirugia.scale).to( { x: 0.60, y: 0.60 }, 1000, Phaser.Easing.Elastic.Out, true);

		tweenIntraoral = game.add.tween(iconeIntraoral);
		tweenIntraoral.to({ x: [iconeIntraoral.x, iconeIntraoral.x, 645 + intraOralX, 645 + intraOralX], y: [iconeIntraoral.y, iconeIntraoral.y, 220 + intraOralY, 220 + intraOralY] }, 3000, "Linear");
		tweenIntraoral.start();
		tweenIntraoral = game.add.tween(iconeIntraoral.scale).to( { x: 0.60, y: 0.60 }, 1000, Phaser.Easing.Elastic.Out, true);

		tweenCpap = game.add.tween(iconeCpap);
		tweenCpap.to({ x: [iconeCpap.x, iconeCpap.x, 814 + cpapX, 814 + cpapX], y: [iconeIntraoral.y, iconeIntraoral.y, 220 + cpapY, 220 + cpapY] }, 3000, "Linear");
		tweenCpap.start();
		tweenCpap = game.add.tween(iconeCpap.scale).to( { x: 0.60, y: 0.60 }, 1000, Phaser.Easing.Elastic.Out, true);

		primeiroCliqueTratamentos = false;
	}
	if(iconeClicado === 'iconeHigiene' && transicao == false && textoHigiene.alpha != 1) {

		if(fimPrimeiroClique){
			tween = game.add.tween(textoHigiene).to( { alpha: 1 }, 1000, "Linear", true, 0);
		} else {
			tween = game.add.tween(textoHigiene).to( { alpha: 1 }, 1000, "Linear", true, 2000);
			transicao = true;
		}
		iconeHigiene.alpha   = 1;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 0.5;

	} else if(iconeClicado === 'iconeRemedio' && transicao == false && textoRemedio.alpha != 1) {
		if(fimPrimeiroClique){
			tween = game.add.tween(textoRemedio).to( { alpha: 1 }, 1000, "Linear", true, 0);
		} else {
			tween = game.add.tween(textoRemedio).to( { alpha: 1 }, 1000, "Linear", true, 2000);
			transicao = true;
		}
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 1;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 0.5;

	} else if(iconeClicado === 'iconeFono' && transicao == false && textoFono.alpha != 1) {
		if(fimPrimeiroClique){
			tween = game.add.tween(textoFono).to( { alpha: 1 }, 1000, "Linear", true, 0);
		} else {
			tween = game.add.tween(textoFono).to( { alpha: 1 }, 1000, "Linear", true, 2000);
			transicao = true;
		}
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 1;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 0.5;

	} else if(iconeClicado === 'iconeCirugia' && transicao == false && textoCirugia.alpha != 1) {
		if(fimPrimeiroClique){
			tween = game.add.tween(textoCirugia).to( { alpha: 1 }, 1000, "Linear", true, 0);
		} else {
			tween = game.add.tween(textoCirugia).to( { alpha: 1 }, 1000, "Linear", true, 2000);
			transicao = true;
		}
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 1;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 0.5;

	} else if(iconeClicado === 'iconeIntraoral' && transicao == false && textoIntraoral.alpha != 1) {
		if(fimPrimeiroClique){
			tween = game.add.tween(textoIntraoral).to( { alpha: 1 }, 1000, "Linear", true, 0);
		} else {
			tween = game.add.tween(textoIntraoral).to( { alpha: 1 }, 1000, "Linear", true, 2000);
			transicao = true;
		}
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 1;
		iconeCpap.alpha      = 0.5;

	} else if(iconeClicado === 'iconeCpap' && transicao == false && textoCpapTrat.alpha != 1) {
		if(fimPrimeiroClique){
			tween = game.add.tween(textoCpapTrat).to( { alpha: 1 }, 1000, "Linear", true, 0);
		} else {
			tween = game.add.tween(textoCpapTrat).to( { alpha: 1 }, 1000, "Linear", true, 2000);
			transicao = true;
		}
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 1;

	} else if(transicao == false && fimPrimeiroClique) {
		iconeHigiene.alpha   = 1;
		iconeRemedio.alpha   = 1;
		iconeFono.alpha      = 1;
		iconeCirugia.alpha   = 1;
		iconeIntraoral.alpha = 1;
		iconeCpap.alpha      = 1;
	}

	textoHigiene.alpha   = 0;
	textoRemedio.alpha   = 0;
	textoFono.alpha      = 0;
	textoCirugia.alpha   = 0;
	textoIntraoral.alpha = 0;
	textoCpapTrat.alpha  = 0;
}

function reiniciaIconesTratamentos() {
	if(!primeiroCliqueTratamentos){
		tweenCpap.kill;
		tweenHigiene.kill;
		tweenFono.kill;
		tweenCirurgia.kill;
		tweenRemedio.kill;
		tweenIntraoral.kill;
	}

	// iconeX e iconeY são variáveis que corrigem a localização por conta da ancorage
	higieneX = iconeHigiene.width/2;
	higieneY = iconeHigiene.height/2;
	iconeHigiene.x = 510 + higieneX;
	iconeHigiene.y = 150 + higieneY;
	iconeHigiene.alpha = 1;
	iconeHigiene.scale.x = 1;
	iconeHigiene.scale.y = 1;

	fonoX = iconeFono.width/2;
	fonoY = iconeFono.height/2;
	iconeFono.x = 632 + fonoX;
	iconeFono.y = 150 + fonoY;
	iconeFono.alpha = 1;
	iconeFono.scale.x = 1;
	iconeFono.scale.y = 1;

	remedioX = iconeRemedio.width/2;
	remedioY = iconeRemedio.height/2;
	iconeRemedio.x = 790 + remedioX;
	iconeRemedio.y = 150 + remedioY;
	iconeRemedio.alpha = 1;
	iconeRemedio.scale.x = 1;
	iconeRemedio.scale.y = 1;

	cirurgiaX = iconeCirugia.width/2;
	cirurgiaY = iconeCirugia.height/2;
	iconeCirugia.x = 510 + cirurgiaX;
	iconeCirugia.y = 360 + cirurgiaY;
	iconeCirugia.alpha = 1;
	iconeCirugia.scale.x = 1;
	iconeCirugia.scale.y = 1;

	intraOralX = iconeIntraoral.width/2;
	intraOralY = iconeIntraoral.height/2;
	iconeIntraoral.x = 645 + intraOralX;
	iconeIntraoral.y = 360 + intraOralY;
	iconeIntraoral.alpha = 1;
	iconeIntraoral.scale.x = 1;
	iconeIntraoral.scale.y = 1;

	cpapX = iconeCpap.width/2;
	cpapY = iconeCpap.height/2;
	iconeCpap.x = 788 + cpapX;
	iconeCpap.y = 360 + cpapY;
	iconeCpap.alpha = 1;
	iconeCpap.scale.x = 1;
	iconeCpap.scale.y = 1;

	primeiroCliqueTratamentos = true;
}

function alteraEscalaImagem(imagem, escala){
	if (imagem.input.pointerOver() && imagem.input.checkPointerOver(game.input.activePointer)) {
		tween = game.add.tween(imagem.scale).to( { x: escala, y: escala }, 1000, Phaser.Easing.Circular.Out, true);
	} else {
		tween = game.add.tween(imagem.scale).to( { x: 1, y: 1}, 1000, Phaser.Easing.Circular.Out, true);
	}
}

function animaIcones(imagem, frames){
	imagem.events.onInputDown.add(function(){
		if(imagem.animations.isPlaying) {
			imagem.animations.stop();
		} else {
			imagem.animations.play('run', frames, false);
		}
	}, this);
}

// Funcoes para colocar os limites que vc vai clicar, cada limite vai ser o index do item invi do modal,
// que cada modal tem 4. Ele será capaz de delimitar o limite no tamanho exato entre o modal e o limite do canvas, 
// independe do tamanho da imagem. O parametro ajuste serve caso modifique o Y da tela no showModal
function limites(modal, limite1, limite2, limite3, limite4, tela, ajuste){
	limiteCima = reg.modal.getModalItem(modal, limite1);
	limiteCima.width = game.width;
	limiteCima.height = (game.height/2 - tela.height/2) + ajuste;
	limiteCima.x = 0;
	limiteCima.y = 0;

	limiteBaixo = reg.modal.getModalItem(modal, limite2);
	limiteBaixo.width = game.width;
	limiteBaixo.height = game.height - (game.height/2 + tela.height/2);
	limiteBaixo.x = 0;
	limiteBaixo.y = (game.height/2 + tela.height/2) + ajuste;

	limiteEsquerda = reg.modal.getModalItem(modal, limite3);
	limiteEsquerda.width = game.width/2 - tela.width/2;
	limiteEsquerda.height = game.height;
	limiteEsquerda.x = 0;
	limiteEsquerda.y = 0;

	limiteDireito = reg.modal.getModalItem(modal, limite4);
	limiteDireito.width = game.width/2 - tela.width/2;
	limiteDireito.height = game.height;
	limiteDireito.x = game.width/2 + tela.width/2;
	limiteDireito.y = 0;
}

// Imagem e a ancoragem (0, 0): esquerdo-cima, (0,1):esquerdo-baixo, (0.5,0.5)
function alinhar(imagem, x, y){
	imagem.anchor.x = x;
	imagem.anchor.y = y;
}