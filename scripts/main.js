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
var primeiroCliqueTratamentos;

// Tela Cpap
var telaCpap, tituloCpap, tituloBeneficios, tituloExperimente;
var textoCpap, textoBeneficios, textoInformacoes;
var aparelhoCpap, botaoPlay, textoArrasteCpap;
var mascaraAcoplada = false;
var personagemErradoCpap, personagemCertoCpap;

// Tela Perguntas
var telaPerguntas, tituloDuvidas, celular, perguntaClicavel, frameResposta, perguntaLabel, balaoPergunta, balaoResposta;
var primeiroCliqueDuvidas;

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

	game.load.atlasJSONHash('engasgo'                    , 'imagens/engasgo/engasgo.png', 'imagens/engasgo/engasgo.json');
	game.load.atlasJSONHash('faltaConcentracao'          , 'imagens/falta-concentracao/falta-concentracao.png', 'imagens/falta-concentracao/falta-concentracao.json');
	game.load.atlasJSONHash('ronco'                      , 'imagens/ronco/ronco.png', 'imagens/ronco/ronco.json');
	game.load.atlasJSONHash('sonoNaoRestaurador'         , 'imagens/sono-nao-restaurador/sono-nao-restaurador.png', 'imagens/sono-nao-restaurador/sono-nao-restaurador.json');
	game.load.atlasJSONHash('sonolencia'                 , 'imagens/sonolencia/sonolencia.png', 'imagens/sonolencia/sonolencia.json');
	game.load.atlasJSONHash('fadiga'                     , 'imagens/fadiga/fadiga.png', 'imagens/fadiga/fadiga.json');

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
	game.load.image('celular'                            , 'imagens/tela-4-celular.png');
	game.load.image('perguntaClicavel'                   , 'imagens/tela-4-pergunta-clicavel.png');
	game.load.image('frameResposta'                      , 'imagens/tela-4-frame-respostas.png');
	game.load.image('perguntaLabel'                      , 'imagens/tela-4-pergunta-label.png');
	game.load.image('balaoPergunta'                      , 'imagens/tela-4-balao-pergunta.png');
	game.load.image('balaoResposta'                      , 'imagens/tela-4-balao-resposta.png');

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

	menuCreditos = this.add.image(820, 550, "menuCreditos");
	menuCreditos.inputEnabled = true;
	menuCreditos.events.onInputDown.add(showModalCreditos, this);

	estrelas = this.add.image(85, 172, "estrelas");
	cobertor = this.add.image(320, 535, "cobertor");

	iconeComSom = this.add.image(940, 556, "iconeComSom");
	iconeComSom.scale.x = 0.25;
	iconeComSom.scale.y = 0.25;
	iconeComSom.alpha = 1;
	iconeComSom.inputEnabled = true;

	iconeSemSom = this.add.image(940, 556, "iconeSemSom");
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
	grupoApresentacao = game.add.sprite(106, 340, 'grupoApresentacao');
	grupoApresentacao.inputEnabled = true;
	grupoApresentacao.events.onInputDown.add(showModalApresentacao, this);

	// GRUPO TRATAMENTOS
	grupoTratamentos = game.add.sprite(308, 150, 'grupoTratamentos');
	grupoTratamentos.inputEnabled = true;
	grupoTratamentos.events.onInputDown.add(showModalTratamentos, this);

	iconeHigiene = reg.modal.getModalItem("modalTratamentos", 2);
	iconeHigiene.inputEnabled = true;
	iconeHigiene.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeHigiene');}, this);

	iconeRemedio = reg.modal.getModalItem("modalTratamentos", 3);
	iconeRemedio.inputEnabled = true;
	iconeRemedio.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeRemedio');}, this);

	iconeFono = reg.modal.getModalItem("modalTratamentos", 4);
	iconeFono.inputEnabled = true;
	iconeFono.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeFono');}, this);

	iconeCirugia = reg.modal.getModalItem("modalTratamentos", 5);
	iconeCirugia.inputEnabled = true;
	iconeCirugia.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeCirugia');}, this);

	iconeIntraoral = reg.modal.getModalItem("modalTratamentos", 6);
	iconeIntraoral.inputEnabled = true;
	iconeIntraoral.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeIntraoral');}, this);

	iconeCpap = reg.modal.getModalItem("modalTratamentos", 7);
	iconeCpap.inputEnabled = true;
	iconeCpap.events.onInputDown.add(function() {rearranjaIconesTratamentos('iconeCpap');}, this);

	// GRUPO CPAP
	grupoCpap = game.add.sprite(580, 150, 'grupoCpap');
	grupoCpap.inputEnabled = true;
	grupoCpap.events.onInputDown.add(showModalCpap, this);

	// GRUPO PERGUNTAS
	grupoPerguntas = game.add.sprite(762, 340, 'grupoPerguntas');
	grupoPerguntas.inputEnabled = true;
	grupoPerguntas.events.onInputDown.add(showModalPerguntas, this);

	// Modal CPAP
	//Aparelho e personagens original para retornar ao tamanho normal
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
	personagemCertoCpap.animations.play('run', 15, true);
	personagemCertoCpap.inputEnabled = true;

	aparelhoCpap = reg.modal.getModalItem("modalCpap", 4);
	aparelhoCpap.inputEnabled = true;

	botaoPlay = reg.modal.getModalItem("modalCpap", 5);
	botaoPlay.inputEnabled = true;
	botaoPlay.x = 800;
	botaoPlay.y = 470;

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

	alteraEscalaImagem(grupoApresentacao, 1.3);
	alteraEscalaImagem(grupoTratamentos, 1.3);
	alteraEscalaImagem(grupoCpap, 1.3);
	alteraEscalaImagem(grupoPerguntas, 1.3);

	alteraEscalaImagem(botaoPlay, 1.2);

	// Limitadores da tela para a máscara no Pop-Up
	if(aparelhoCpap.x < 91 ) aparelhoCpap.x = 91;
	if(aparelhoCpap.x > 854) aparelhoCpap.x = 854;
	if(aparelhoCpap.y < 72 ) aparelhoCpap.y = 72;
	if(aparelhoCpap.y > 469) aparelhoCpap.y = 469;

	// Condição de acoplação de máscara
	if( aparelhoCpap.x < personagemErradoCpap.x + 50 && 
		aparelhoCpap.x > personagemErradoCpap.x + 20 && 
		aparelhoCpap.y < personagemErradoCpap.y + 50 && 
		aparelhoCpap.y > personagemErradoCpap.y && 
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

	/*
	if (iconeHigiene.input.pointerOver()) {
		 tween = game.add.tween(iconeHigiene.scale).to( { x: 0.3, y: 0.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(iconeHigiene.scale).to( { x: 0.25, y: 0.25 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	
	if (iconeRemedio.input.pointerOver()) {
		 tween = game.add.tween(iconeRemedio.scale).to( { x: 0.30, y: 0.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(iconeRemedio.scale).to( { x: 0.25, y: 0.25 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	
	if (iconeFono.input.pointerOver()) {
		 tween = game.add.tween(iconeFono.scale).to( { x: 0.30, y: 0.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(iconeFono.scale).to( { x: 0.25, y: 0.25 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	
	if (iconeCirugia.input.pointerOver()) {
		 tween = game.add.tween(iconeCirugia.scale).to( { x: 0.30, y: 0.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(iconeCirugia.scale).to( { x: 0.25, y: 0.25 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	
	if (iconeIntraoral.input.pointerOver()) {
		 tween = game.add.tween(iconeIntraoral.scale).to( { x: 0.30, y: 0.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(iconeIntraoral.scale).to( { x: 0.25, y: 0.25 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	
	if (iconeCpap.input.pointerOver()) {
		 tween = game.add.tween(iconeCpap.scale).to( { x: 0.30, y: 0.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(iconeCpap.scale).to( { x: 0.25, y: 0.25 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	*/
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
				content: "bgModal",
				contentScale: 1
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
				contentScale: 1,
				atlasParent: "engasgo"
			},
			{
				type: "sprite",
				contentScale: 1,
				atlasParent: "faltaConcentracao"
			},
			{
				type: "sprite",
				contentScale: 1,
				atlasParent: "ronco"
			},
			{
				type: "sprite",
				contentScale: 1,
				atlasParent: "sonoNaoRestaurador"
			},
			{
				type: "sprite",
				contentScale: 1,
				atlasParent: "sonolencia"
			},
			{
				type: "sprite",
				contentScale: 1,
				atlasParent: "fadiga"
			},
			{
				type: "sprite",
				contentScale: 1,
				atlasParent: "respiracaoApneia"
			},
			{
				type: "sprite",
				contentScale: 1,
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
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "tituloAos"
			},
			{
				type: "image",
				contentScale: 1,
				content: "tituloSintomas"
			},
			{
				type: "image",
				contentScale: 1,
				content: "tituloConsequencia"
			},
			{
				type: "image",
				contentScale: 1,
				content: "textoAos"
			},
			{
				type: "image",
				contentScale: 1,
				content: "textoConsequencia1"
			},
			{
				type: "image",
				contentScale: 1,
				content: "textoConsequencia2"
			},
			{
				type: "image",
				contentScale: 1,
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
				content: "bgModal",
				contentScale: 1,
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
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalTratamentos();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalTratamentos();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalTratamentos();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalTratamentos();
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
				content: "bgModal",
				contentScale: 1,
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
				offsetY: 2000,
				atlasParent: "personagemCertoCpap"
			},
			{
				type: "sprite",
				content: "aparelhoCpap",
				offsetY: 108,
				offsetX: -285,
				contentScale: 1,
				ondrag : function () {	
						return true;
				}
			},
			{
				type : "image",
				content: "botaoPlay",
				offsetY: 150,
				offsetX: 290,
				callback : function(){
					// window.open("https://www.youtube.com/?gl=BR&hl=pt");				
					abreJanelaDeVideo();			
				}
			},
			{
				type : "image",
				content: "textoArrasteCpap",
				offsetY: 190,
				offsetX: -285
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type: "image",
				contentScale: 1,
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
				content: "bgModal",
				contentScale: 1,
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
				contentScale: 1,
				content: "tituloDuvidas"
			},
			{
				type: "image",
				contentScale: 1,
				content: "celular"
			},
			{
				type: "image",
				contentScale: 1,
				content: "frameResposta"
			},
			{
				type: "image",
				contentScale: 1,
				content: "perguntaLabel"
			},
			{
				type: "image",
				contentScale: 1,
				content: "perguntaClicavel"
			},
			{
				type: "image",
				contentScale: 1,
				content: "balaoPergunta"
			},
			{
				type: "image",
				contentScale: 1,
				content: "balaoResposta",
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalPerguntas();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalPerguntas();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalPerguntas();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalPerguntas();
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
				content: "bgModal",
				contentScale: 1
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
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalCreditos();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalCreditos();
				}
			},
			{
				type: "image",
				contentScale: 1,
				content: "invi",
				callback : function(){
					hideModalCreditos();
				}
			},
			{
				type: "image",
				contentScale: 1,
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
	limites("modalApresentacao", 12, 13, 14, 15, telaApresentacao, 0);
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
	textoConsequencia2.y = 300;

	textoConsequencia3   = reg.modal.getModalItem("modalApresentacao", 22);
	textoConsequencia3.x = 680;
	textoConsequencia3.y = 390;
	
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
	
	engasgo.x = 385;
	engasgo.y = 150;
	
	faltaConcentracao.x = 510;
	faltaConcentracao.y = 150;
	
	ronco.x = 385;
	ronco.y = 280;
	
	sonoNaoRestaurador.x = 510;
	sonoNaoRestaurador.y = 280;
	
	sonolencia.x = 385;
	sonolencia.y = 410;
	
	fadiga.x = 510;
	fadiga.y = 410;

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
	tituloTratamento.x = 520;
	tituloTratamento.y = 100;

	textoHigiene = reg.modal.getModalItem("modalTratamentos", 11);
	textoHigiene.x = 520;
	textoHigiene.y = 350;
	textoHigiene.alpha = 0;

	textoRemedio = reg.modal.getModalItem("modalTratamentos", 12);
	textoRemedio.x = 520;
	textoRemedio.y = 350;
	textoRemedio.alpha = 0;

	textoFono = reg.modal.getModalItem("modalTratamentos", 13);
	textoFono.x = 520;
	textoFono.y = 350;
	textoFono.alpha = 0;

	textoCirugia = reg.modal.getModalItem("modalTratamentos", 14);
	textoCirugia.x = 520;
	textoCirugia.y = 350;
	textoCirugia.alpha = 0;

	textoIntraoral = reg.modal.getModalItem("modalTratamentos", 15);
	textoIntraoral.x = 520;
	textoIntraoral.y = 350;
	textoIntraoral.alpha = 0;

	textoCpapTrat = reg.modal.getModalItem("modalTratamentos", 16);
	textoCpapTrat.x = 520;
	textoCpapTrat.y = 350;
	textoCpapTrat.alpha = 0;

	reg.modal.showModal("modalTratamentos");
}

function hideModalTratamentos(){
	telaPrincipal.alpha = 1;
	habilitaTodasOvelhas();
	telaPrincipal.alpha = 1;
	reg.modal.hideModal("modalTratamentos");

	reiniciaIconesTratamentos();
}

// Modal Cpap
function showModalCpap(){
	telaCpap = reg.modal.getModalItem("modalCpap", 0);
	limites("modalCpap", 7, 8, 9, 10, telaCpap, 0);
	desabilitaTodasOvelhas();
	somRonco.stop();
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
	textoInformacoes.x = 730;
	textoInformacoes.y = 440;

	aparelhoCpap.alpha = 0.1;
	tween = game.add.tween(aparelhoCpap).to( { alpha: 1 }, 2000, "Linear", true, 2000);
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

function mostrarFrameDeRespostas() {

	tween = game.add.tween(celular);
	tween.to({ x: [celular.x, celular.x, 150, 150], y: [celular.y, celular.y, celular.y, celular.y] }, 2000, "Linear");
	tween.start();
	
	tween = game.add.tween(perguntaClicavel);
	tween.to({ x: [perguntaClicavel.x, perguntaClicavel.x, 170, 170], y: [perguntaClicavel.y, perguntaClicavel.y, perguntaClicavel.y, perguntaClicavel.y] }, 2000, "Linear");
	tween.start();
	
	tween.onComplete.add(function() {
		tween = game.add.tween(frameResposta);
		tween.to( { alpha: 1 }, 2000, "Linear", true);
		tween.start();
		
		tween = game.add.tween(perguntaLabel);
		tween.to( { alpha: 1 }, 2000, "Linear", true);
		tween.start();
		
		tween = game.add.tween(balaoPergunta);
		tween.to( { alpha: 1 }, 2000, "Linear", true);
		tween.start();
		
		tween.onComplete.add(function() {
			tween = game.add.tween(balaoResposta);
			tween.to( { alpha: 1 }, 2000, "Linear", true);
			tween.start();
		}, this);
	}, this);
	
}

// Modal Perguntas
function showModalPerguntas(){
	telaPerguntas = reg.modal.getModalItem("modalPerguntas", 0);
	limites("modalPerguntas", 9, 10, 11, 12, telaPerguntas, 10);
	desabilitaTodasOvelhas();
	somRonco.stop();
	telaPrincipal.alpha = 0.7;

	telaPerguntas.y = 80;

	tituloDuvidas = reg.modal.getModalItem("modalPerguntas", 2);
	tituloDuvidas.x = 430;
	tituloDuvidas.y = 100;

	celular = reg.modal.getModalItem("modalPerguntas", 3);
	celular.x = 383;
	celular.y = 150;

	perguntaClicavel = reg.modal.getModalItem("modalPerguntas", 6);
	perguntaClicavel.x = 403;
	perguntaClicavel.y = 220;
	perguntaClicavel.inputEnabled = true;
	perguntaClicavel.events.onInputDown.add(mostrarFrameDeRespostas, this);

	frameResposta = reg.modal.getModalItem("modalPerguntas", 4);
	frameResposta.x = 390;
	frameResposta.y = 150;
	frameResposta.alpha = 0;
	frameResposta.scale.x = 1.1;
	frameResposta.scale.y = 1.12;

	perguntaLabel = reg.modal.getModalItem("modalPerguntas", 5);
	perguntaLabel.x = 420;
	perguntaLabel.y = 155;
	perguntaLabel.alpha = 0;

	balaoPergunta = reg.modal.getModalItem("modalPerguntas", 7);
	balaoPergunta.x = 460;
	balaoPergunta.y = 210;
	balaoPergunta.alpha = 0;

	balaoResposta = reg.modal.getModalItem("modalPerguntas", 8);
	balaoResposta.x = 500;
	balaoResposta.y = 280;
	balaoResposta.alpha = 0;

	reg.modal.showModal("modalPerguntas");
}

function hideModalPerguntas(){
	habilitaTodasOvelhas();
	telaPrincipal.alpha = 1;
	reg.modal.hideModal("modalPerguntas");
}

function showModalCreditos(){
	telaCreditos = reg.modal.getModalItem("modalCreditos", 0);
	limites("modalCreditos", 3, 4, 5, 6, telaCreditos, 10);
	desabilitaTodasOvelhas();
	telaPrincipal.alpha = 0.7;

	telaCreditos.y = 80;
	
	textoCreditos = reg.modal.getModalItem("modalCreditos", 2);
	textoCreditos.x = 320;
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
	personagemCertoCpap.scale.x = 1.6;
	personagemCertoCpap.scale.y = 1.6;

	personagemCertoCpap.x = 562;
	personagemCertoCpap.y = 116;
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
	aparelhoCpap.width = aparelhoCpapOriginal.width;
	aparelhoCpap.height = aparelhoCpapOriginal.height;

	aparelhoCpap.alpha = 0.1;
	tween = game.add.tween(aparelhoCpap).to( { alpha: 1 }, 2000, "Linear", true, 2000);
	tween.onComplete.add(function() {
		textoArrasteCpap.alpha = 1;
	}, this);

	personagemErradoCpap.width = personagemErradoCpapOriginal.width;
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

	if(primeiroCliqueTratamentos === true) {
		tween = game.add.tween(iconeHigiene);
		tween.to({ x: [iconeHigiene.x, iconeHigiene.x, iconeHigiene.x, iconeHigiene.x], y: [150, 150, 150, 150] }, 3000, "Linear");
		tween.start();	
		tween = game.add.tween(iconeHigiene.scale).to( { x: 0.15, y: 0.15 }, 1000, Phaser.Easing.Elastic.Out, true);

		tween = game.add.tween(iconeFono);
		tween.to({ x: [iconeFono.x, iconeFono.x, 670, 670], y: [150, 150, 150, 150] }, 3000, "Linear");
		tween.start();	
		tween = game.add.tween(iconeFono.scale).to( { x: 0.15, y: 0.15 }, 1000, Phaser.Easing.Elastic.Out, true);
		
		tween = game.add.tween(iconeRemedio);
		tween.to({ x: [iconeRemedio.x, iconeRemedio.x, 840, 840], y: [150, 150, 150, 150] }, 3000, "Linear");
		tween.start();	
		tween = game.add.tween(iconeRemedio.scale).to( { x: 0.15, y: 0.15 }, 1000, Phaser.Easing.Elastic.Out, true);

		tween = game.add.tween(iconeCirugia);
		tween.to({ x: [iconeCirugia.x, iconeCirugia.x, iconeCirugia.x, iconeCirugia.x], y: [iconeCirugia.y, iconeCirugia.y, 250, 250] }, 3000, "Linear");
		tween.start();	
		tween = game.add.tween(iconeCirugia.scale).to( { x: 0.15, y: 0.15 }, 1000, Phaser.Easing.Elastic.Out, true);

		tween = game.add.tween(iconeIntraoral);
		tween.to({ x: [iconeIntraoral.x, iconeIntraoral.x, 675, 675], y: [iconeIntraoral.y, iconeIntraoral.y, 250, 250] }, 3000, "Linear");
		tween.start();	
		tween = game.add.tween(iconeIntraoral.scale).to( { x: 0.15, y: 0.15 }, 1000, Phaser.Easing.Elastic.Out, true);

		tween = game.add.tween(iconeCpap);
		tween.to({ x: [iconeCpap.x, iconeCpap.x, 840, 840], y: [iconeIntraoral.y, iconeIntraoral.y, 250, 250] }, 3000, "Linear");
		tween.start();	
		tween = game.add.tween(iconeCpap.scale).to( { x: 0.15, y: 0.15 }, 1000, Phaser.Easing.Elastic.Out, true);

		primeiroCliqueTratamentos = false;
	}

	textoHigiene.alpha = 0;
	textoRemedio.alpha = 0;
	textoFono.alpha = 0;
	textoCirugia.alpha = 0;
	textoIntraoral.alpha = 0;
	textoCpapTrat.alpha = 0;

	if(iconeClicado == 'iconeHigiene') {
		tween = game.add.tween(textoHigiene).to( { alpha: 1 }, 1000, "Linear", true, 2000);
		iconeHigiene.alpha   = 1;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 0.5;
	}
	
	if(iconeClicado === 'iconeRemedio') {
		tween = game.add.tween(textoRemedio).to( { alpha: 1 }, 1000, "Linear", true, 2000);
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 1;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 0.5;
	}
	
	if(iconeClicado === 'iconeFono') {
		tween = game.add.tween(textoFono).to( { alpha: 1 }, 1000, "Linear", true, 2000);
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 1;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 0.5;
	}
	
	if(iconeClicado === 'iconeCirugia') {
		tween = game.add.tween(textoCirugia).to( { alpha: 1 }, 1000, "Linear", true, 2000);
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 1;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 0.5;
	}
	
	if(iconeClicado === 'iconeIntraoral') {
		tween = game.add.tween(textoIntraoral).to( { alpha: 1 }, 1000, "Linear", true, 2000);
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 1;
		iconeCpap.alpha      = 0.5;
	}
	
	if(iconeClicado === 'iconeCpap') {
		tween = game.add.tween(textoCpapTrat).to( { alpha: 1 }, 1000, "Linear", true, 2000);
		iconeHigiene.alpha   = 0.5;
		iconeRemedio.alpha   = 0.5;
		iconeFono.alpha      = 0.5;
		iconeCirugia.alpha   = 0.5;
		iconeIntraoral.alpha = 0.5;
		iconeCpap.alpha      = 1;
	}
}

function reiniciaIconesTratamentos() {
	iconeHigiene.x = 520;
	iconeHigiene.y = 150;
	iconeHigiene.alpha = 1;
	iconeHigiene.scale.x = 0.25;
	iconeHigiene.scale.y = 0.25;

	iconeFono.x = 640;
	iconeFono.y = 150;
	iconeFono.alpha = 1;
	iconeFono.scale.x = 0.25;
	iconeFono.scale.y = 0.25;

	iconeRemedio.x = 800;
	iconeRemedio.y = 150;
	iconeRemedio.alpha = 1;
	iconeRemedio.scale.x = 0.25;
	iconeRemedio.scale.y = 0.25;

	iconeCirugia.x = 520;
	iconeCirugia.y = 370;
	iconeCirugia.alpha = 1;
	iconeCirugia.scale.x = 0.25;
	iconeCirugia.scale.y = 0.25;

	iconeIntraoral.x = 650;
	iconeIntraoral.y = 370;
	iconeIntraoral.alpha = 1;
	iconeIntraoral.scale.x = 0.25;
	iconeIntraoral.scale.y = 0.25;

	iconeCpap.x = 800;
	iconeCpap.y = 370;
	iconeCpap.alpha = 1;
	iconeCpap.scale.x = 0.25;
	iconeCpap.scale.y = 0.25;
	
	primeiroCliqueTratamentos = true;
}

function alteraEscalaImagem(imagem, escala){
	if (imagem.input.pointerOver()) {
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

// limitesPerguntas tem uma função para si por conta que ele tem uma elevação de 80 pixels e o +10 
//na quarta linha abaixo reverte isso
function limitesPerguntas(){
	limiteCima = reg.modal.getModalItem("modalPerguntas", 9);
	limiteCima.width = game.width;
	limiteCima.height = (game.height/2 - telaPerguntas.height/2) + 10;
	limiteCima.x =0;
	limiteCima.y =0;

	limiteBaixo = reg.modal.getModalItem("modalPerguntas", 10);
	limiteBaixo.width = game.width;
	limiteBaixo.height = game.height - (game.height/2 + telaPerguntas.height/2);
	limiteBaixo.x =0;
	limiteBaixo.y = (game.height/2 + telaPerguntas.height/2) + 10;

	limiteEsquerda = reg.modal.getModalItem("modalPerguntas", 11);
	limiteEsquerda.width = game.width/2 - telaPerguntas.width/2;
	limiteEsquerda.height = game.height;
	limiteEsquerda.x = 0;
	limiteEsquerda.y = 0;

	limiteDireito = reg.modal.getModalItem("modalPerguntas", 12);
	limiteDireito.width = game.width/2 - telaPerguntas.width/2;
	limiteDireito.height = game.height;
	limiteDireito.x = game.width/2 + telaPerguntas.width/2;
	limiteDireito.y = 0;
}

// Funcoes para colocar os limites que vc vai clicar, cada limite vai ser o index do item invi do modal,
//que cada modal tem 4. Ele será capaz de delimitar o limite no tamanho exato entre o modal e o limite do canvas, 
//independe do tamanho da imagem. O parametro ajuste serve caso modifique o Y da tela no showModal

function limites(modal, limite1, limite2, limite3, limite4, tela, ajuste){
	limiteCima = reg.modal.getModalItem(modal, limite1);
	limiteCima.width = game.width;
	limiteCima.height = (game.height/2 - tela.height/2) + ajuste;
	limiteCima.x = 0;
	limiteCima.y = 0;

	limiteBaixo = reg.modal.getModalItem(modal, limite2);
	limiteBaixo.width = game.width;
	limiteBaixo.height = game.height-(game.height/2 + tela.height/2);
	limiteBaixo.x = 0;
	limiteBaixo.y = (game.height/2 + tela.height/2) + ajuste;

	limiteEsquerda = reg.modal.getModalItem(modal, limite3);
	limiteEsquerda.width = game.width/2-tela.width/2;
	limiteEsquerda.height = game.height;
	limiteEsquerda.x = 0;
	limiteEsquerda.y = 0;

	limiteDireito = reg.modal.getModalItem(modal, limite4);
	limiteDireito.width = game.width/2 - tela.width/2;
	limiteDireito.height = game.height;
	limiteDireito.x = game.width/2 + tela.width/2;
	limiteDireito.y = 0;
}