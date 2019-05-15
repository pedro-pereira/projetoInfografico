var game = new Phaser.Game(1024, 600, Phaser.AUTO, 'renderPhaser', { preload: preload, create: create, update:update});

var reg = {};

var personagemPrincipal, travesseiro; 
var grupoApresentacao, grupoTratamentos, grupoCpap, grupoPerguntas;
var tween;

var moeda11, moeda12, moeda21, moeda22, moeda31, moeda32;

var aparelhoCpap, botaoPlay, textoArrasteCpap;
var mascaraAcoplada = false;
var personagemRespirandoErrado, personagemRespirandoCerto;

function preload (){

	// Tela Principal
	game.load.image('bg'                                 , 'imagens/backgroundAzul.png');
	game.load.image('tituloPrincipal'                    , 'imagens/tituloPrincipal.png');

	game.load.image('travesseiro'                        , 'imagens/travesseiro.png');

	game.load.image('grupoApresentacao'                  , 'imagens/ovelha-1.png');
	game.load.image('grupoTratamentos'                   , 'imagens/ovelha-2.png');
	game.load.image('grupoCpap'                          , 'imagens/ovelha-3.png');
	game.load.image('grupoPerguntas'                     , 'imagens/ovelha-4.png');

	// Modal Apresentação
	game.load.image('bgModalApresentacao'                , 'imagens/tela-1.png');
	game.load.image('botaoFecharApresentacao'            , 'imagens/botaoFechar.png');

	game.load.atlasJSONHash('moeda11'                    , 'imagens/moedas.png', 'imagens/moedas.json');
	game.load.atlasJSONHash('moeda12'                    , 'imagens/moedas.png', 'imagens/moedas.json');
	game.load.atlasJSONHash('moeda21'                    , 'imagens/moedas.png', 'imagens/moedas.json');
	game.load.atlasJSONHash('moeda22'                    , 'imagens/moedas.png', 'imagens/moedas.json');
	game.load.atlasJSONHash('moeda31'                    , 'imagens/moedas.png', 'imagens/moedas.json');
	game.load.atlasJSONHash('moeda32'                    , 'imagens/moedas.png', 'imagens/moedas.json');

	// Modal #2
	game.load.image('play'                               , 'imagens/modal2_play.png');

	// Modal #3
	game.load.image('gameover'                           , 'imagens/modal3_gameover.png');
	game.load.image('tryagain'                           , 'imagens/modal3_tryagain.png');
	game.load.image('yes'                                , 'imagens/modal3_yes.png');
	game.load.image('no'                                 , 'imagens/modal3_no.png');

	// Modal CPAP
	game.load.image('bgModalCpap'                        , 'imagens/tela-3.png');
	game.load.image('botaoFecharCpap'                    , 'imagens/botaoFechar.png');
	game.load.image('aparelhoCpap'                       , 'imagens/aparelhoCpap.png');
	game.load.image('botaoPlay'                          , 'imagens/botaoPlay.png');
	game.load.image('textoArrasteCpap'                   , 'imagens/textoArrasteCpap.png');
	game.load.atlasJSONHash('personagemRespirandoErrado' , 'imagens/sprite_personagem_respirando_errado.png'
                                                         , 'imagens/sprite_personagem_respirando_errado.json');
	game.load.atlasJSONHash('personagemRespirandoCerto'  , 'imagens/sprite_personagem_respirando_certo.png'
                                                         , 'imagens/sprite_personagem_respirando_certo.json');
}

function create (){

	// Tela Principal
	for (let posY = 0; posY < 19; posY++) {
		for (let posX = 0; posX < 32; posX++) {
			this.add.image(32 * posX, 32 * posY, "bg");
		}
	}

	this.add.image(96, 32, "tituloPrincipal");
	
	personagemPrincipal = this.add.sprite(350, 350, 'personagemRespirandoErrado');
	personagemPrincipal.scale.x = 1.5;
	personagemPrincipal.scale.y = 1.5;
	personagemPrincipal.animations.add('run');
	personagemPrincipal.animations.play('run', 15, true);

	reg.modal = new gameModal(game);
	createModals();

	// GRUPO APRESENTACAO
	grupoApresentacao = game.add.sprite(128, 340, 'grupoApresentacao');
	grupoApresentacao.inputEnabled = true;
	grupoApresentacao.events.onInputDown.add(showModalApresentacao, this);

	// GRUPO TRATAMENTOS
	grupoTratamentos = game.add.sprite(289, 150, 'grupoTratamentos');
	grupoTratamentos.inputEnabled = true;
	// Comentada para futura implementação
	//grupoTratamentos.events.onInputDown.add(showModalTratamentos, this);

	// GRUPO CPAP
	grupoCpap = game.add.sprite(611, 150, 'grupoCpap');
	grupoCpap.inputEnabled = true;
	grupoCpap.events.onInputDown.add(showModalCpap, this);

	// GRUPO PERGUNTAS
	grupoPerguntas = game.add.sprite(772, 340, 'grupoPerguntas');
	grupoPerguntas.inputEnabled = true;
	// Comentada para futura implementação
	// grupoPerguntas.events.onInputDown.add(showModalPerguntas, this);

	// Modal CPAP
	personagemRespirandoErrado = reg.modal.getModalItem("modalCpap", 2);
	personagemRespirandoErrado.animations.add('run');
	personagemRespirandoErrado.animations.play('run', 15, true);
	personagemRespirandoErrado.inputEnabled = true;

	personagemRespirandoCerto = reg.modal.getModalItem("modalCpap", 3);
	personagemRespirandoCerto.animations.add('run');
	personagemRespirandoCerto.animations.play('run', 15, true);
	personagemRespirandoCerto.inputEnabled = true;

	//Aparelho e personagens original para retornar ao tamanho normal
	aparelhoCpapOriginal = game.add.sprite(1000, 10000, 'aparelhoCpap');
	personagemRespirandoErradoOriginal =  game.add.sprite(1000, 10000, 'personagemRespirandoErrado');

	aparelhoCpap = reg.modal.getModalItem("modalCpap", 4);
	aparelhoCpap.inputEnabled = true;
	aparelhoCpap.input.enableDrag(true);

	textoArrasteCpap = reg.modal.getModalItem("modalCpap", 6);
	textoArrasteCpap.alpha = 0;

	aparelhoCpap.alpha = 0.1;
	tween = game.add.tween(aparelhoCpap).to( { alpha: 1 }, 2000, "Linear", true, 2000);
	tween.onComplete.add(function() {
		textoArrasteCpap.alpha = 1;
	}, this);

	botaoPlay = reg.modal.getModalItem("modalCpap", 5);
	botaoPlay.inputEnabled = true;

	// ANIMACAO - Cria animacao com 5 frames
	moeda11 = reg.modal.getModalItem("modalApresentacao", 2);
	moeda11.animations.add('run');
	moeda11.inputEnabled = true;

	moeda12 = reg.modal.getModalItem("modalApresentacao", 3);
	moeda12.animations.add('run');
	moeda12.inputEnabled = true;

	moeda21 = reg.modal.getModalItem("modalApresentacao", 4);
	moeda21.animations.add('run');
	moeda21.inputEnabled = true;

	moeda22	= reg.modal.getModalItem("modalApresentacao", 5);
	moeda22.animations.add('run');
	moeda22.inputEnabled = true;

	moeda31 = reg.modal.getModalItem("modalApresentacao", 6);
	moeda31.animations.add('run');
	moeda31.inputEnabled = true;

	moeda32 = reg.modal.getModalItem("modalApresentacao", 7);
	moeda32.animations.add('run');
	moeda32.inputEnabled = true;
}

function update () {
	
	// Faz as ovelhas aumentarem de tamanho - Início
	if (grupoApresentacao.input.pointerOver()) {
		 tween = game.add.tween(grupoApresentacao.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(grupoApresentacao.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}

	if (grupoTratamentos.input.pointerOver()) {
		 tween = game.add.tween(grupoTratamentos.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(grupoTratamentos.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}

	if (grupoCpap.input.pointerOver()) {
		 tween = game.add.tween(grupoCpap.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(grupoCpap.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}

	if (grupoPerguntas.input.pointerOver()) {
		 tween = game.add.tween(grupoPerguntas.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(grupoPerguntas.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	// Faz as ovelhas aumentarem de tamanho - Fim

	// Faz o botão de player aumentar de tamanho - Início
	if (botaoPlay.input.pointerOver()) {
		 tween = game.add.tween(botaoPlay.scale).to( { x: 1.2, y: 1.2 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(botaoPlay.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	// Faz o botão de player aumentar de tamanho - Fim

	// Limitadores da tela para a máscara no Pop-Up
	if(aparelhoCpap.x < 91 ) aparelhoCpap.x = 91;
	if(aparelhoCpap.x > 854) aparelhoCpap.x = 854;
	if(aparelhoCpap.y < 72 ) aparelhoCpap.y = 72;
	if(aparelhoCpap.y > 469) aparelhoCpap.y = 469;

	// Condição de acoplação de máscara
	if( aparelhoCpap.x < personagemRespirandoErrado.x + 50 && 
		aparelhoCpap.x > personagemRespirandoErrado.x + 20 && 
		aparelhoCpap.y < personagemRespirandoErrado.y + 50 && 
		aparelhoCpap.y > personagemRespirandoErrado.y && 
		!mascaraAcoplada)
	{
			mascaraAcoplada = true;
			if(mascaraAcoplada) {
				aparecePersonagemDormindo();
				desapareceCpap();
			}
	}

	// Faz as moedas rotacionarem - Início
	moeda11.events.onInputDown.add(function(){
		if(moeda11.animations.isPlaying) {
			moeda11.animations.stop();
		} else {
			moeda11.animations.play('run', 15, false);
		}
	}, this);

	moeda12.events.onInputDown.add(function(){
		if(moeda12.animations.isPlaying) {
			moeda12.animations.stop();
		} else {
			moeda12.animations.play('run', 15, false);
		}
	}, this);

	moeda21.events.onInputDown.add(function(){
		if(moeda21.animations.isPlaying) {
			moeda21.animations.stop();
		} else {
			moeda21.animations.play('run', 15, false);
		}
	}, this);

	moeda22.events.onInputDown.add(function(){
		if(moeda22.animations.isPlaying) {
			moeda22.animations.stop();
		} else {
			moeda22.animations.play('run', 15, false);
		}
	}, this);

	moeda31.events.onInputDown.add(function(){
		if(moeda31.animations.isPlaying) {
			moeda31.animations.stop();
		} else {
			moeda31.animations.play('run', 15, false);
		}
	}, this);

	moeda32.events.onInputDown.add(function(){
		if(moeda32.animations.isPlaying) {
			moeda32.animations.stop();
		} else {
			moeda32.animations.play('run', 15, false);
		}
	}, this);
	// Faz as moedas rotacionarem - Fim

	// Faz as moedas aumentarem de tamanho - Início
	if (moeda11.input.pointerOver()) {
		 tween = game.add.tween(moeda11.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(moeda11.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}

	if (moeda12.input.pointerOver()) {
		 tween = game.add.tween(moeda12.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(moeda12.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}

	if (moeda21.input.pointerOver()) {
		 tween = game.add.tween(moeda21.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(moeda21.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}

	if (moeda22.input.pointerOver()) {
		 tween = game.add.tween(moeda22.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(moeda22.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}

	if (moeda31.input.pointerOver()) {
		 tween = game.add.tween(moeda31.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(moeda31.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}

	if (moeda32.input.pointerOver()) {
		 tween = game.add.tween(moeda32.scale).to( { x: 1.3, y: 1.3 }, 1000, Phaser.Easing.Elastic.Out, true);
	} else {
		tween = game.add.tween(moeda32.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
	}
	// Faz as moedas aumentarem de tamanho - Fim
}

function createModals() {
	// Modal #1 - Apresentação
	reg.modal.createModal({
		type:"modalApresentacao",
		includeBackground: false,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "image",
				content: "bgModalApresentacao",
				contentScale: 1
			},
			{
				type : "image",
				content: "botaoFecharApresentacao",
				offsetY: -245,
				offsetX: 435,
				callback : function(){
					hideModalApresentacao();
				}
			},
			{
				type: "sprite",
				offsetY: -98,
				offsetX: -40,
				contentScale: 1,
				atlasParent: "moeda11"
			},
			{
				type: "sprite",
				offsetY: -98,
				offsetX: 50,
				contentScale: 1,
				atlasParent: "moeda12"
			},
			{
				type: "sprite",
				offsetY: 8,
				offsetX: -40,
				contentScale: 1,
				atlasParent: "moeda21"
			},
			{
				type: "sprite",
				offsetY: 8,
				offsetX: 50,
				contentScale: 1,
				atlasParent: "moeda22"
			},
			{
				type: "sprite",
				offsetY: 118,
				offsetX: -40,
				contentScale: 1,
				atlasParent: "moeda31"
			},
			{
				type: "sprite",
				offsetY: 118,
				offsetX: 50,
				contentScale: 1,
				atlasParent: "moeda32"
			}
		]
	});

	// Modal #2 - Tratamentos - Vídeos para teste
	reg.modal.createModal({
		type:"modalTratamentos",
		includeBackground: true,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "text",
				content: "Seriously???",
				fontFamily: "Luckiest Guy",
				fontSize: 42,
				color: "0xFEFF49",
				offsetY: 50
			},
			{
				type: "image",
				content: "play",
				offsetY: -30,
				offsetX: 0,
				contentScale: 0.8,
				callback: function () {
						var overlay = document.querySelector('.modal');
						overlay.style.display = "block";
				}
			}
		]
	});

	// Modal #3 - Perguntas
	reg.modal.createModal({
		type:"modalPerguntas",
		includeBackground: true,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "image",
				content: "gameover",
				offsetY: -110,
				contentScale: 0.6
			},
			{
				type: "image",
				content: "tryagain",
				contentScale: 0.6
			},
			{
				type: "image",
				content: "yes",
				offsetY: 100,
				offsetX: -80,
				contentScale: 0.6,
				callback: function () {
					alert("YES!");
				}
			},
			{
				type: "image",
				content: "no",
				offsetY: 100,
				offsetX: 80,
				contentScale: 0.6,
				callback: function () {
					alert("NO!");
				}
			}
		]
	});

	// Modal #5 - Cpap
	reg.modal.createModal({
		type:"modalCpap",
		includeBackground: false,
		modalCloseOnInput: true,
		itemsArr: [
			{
				type: "image",
				content: "bgModalCpap",
				contentScale: 1
			},
			{
				type : "image",
				content: "botaoFecharCpap",
				offsetY: -245,
				offsetX: 435,
				callback : function(){
					hideModalCpap();
				}
			},
			{
				type: "sprite",
				offsetY: 0,
				offsetX: 275,
				contentScale: 1.2,
				atlasParent: "personagemRespirandoErrado"
			},
			{
				type: "sprite",
				offsetY: 2000,
				contentScale: 1,
				atlasParent: "personagemRespirandoCerto"
			},
			{
				type: "sprite",
				content: "aparelhoCpap",
				offsetY: 108,
				offsetX: -275,
				contentScale: 1,
				ondrag : function () {	
						return true;
				}
			},
			{
				type : "image",
				content: "botaoPlay",
				offsetY: 150,
				offsetX: 270,
				callback : function(){
					window.open("https://www.youtube.com/?gl=BR&hl=pt");
					
					/*
					// Comentado por ainda precisar de refinamentos
					var overlay = document.querySelector('.modal');
					overlay.style.display = "block";
					*/
				}
			},
			{
				type : "image",
				content: "textoArrasteCpap",
				offsetY: 190,
				offsetX: -270
			}
		]
	});
}

// Modal #1 - Apresentação
function showModalApresentacao(){
	desabilitaTodasOvelhas();
	reg.modal.showModal("modalApresentacao");
}

// Modal #2 - Tratamentos
function showModalTratamentos(){
	desabilitaTodasOvelhas();
	reg.modal.showModal("modalTratamentos");
}

// Modal #3 - Perguntas
function showModalPerguntas(){
	desabilitaTodasOvelhas();
	reg.modal.showModal("modalPerguntas");
}

// Modal #5 - Cpap
function showModalCpap(){
	desabilitaTodasOvelhas();
	reg.modal.showModal("modalCpap");
}

function hide() {
	var overlay = document.querySelector('.modal');
	overlay.style.display = "none";
}

function hideModalApresentacao(){
	habilitaTodasOvelhas();
	reg.modal.hideModal("modalApresentacao");
}

// Função que faz popup desaparecer e coloca os valores no padrão
function hideModalCpap(){
	habilitaTodasOvelhas();
	reg.modal.hideModal("modalCpap");
	mascaraAcoplada = false;
	textoArrasteCpap.alpha = 0;
	apareceCpap();
	desaparecePersonagem();
}

// Função que faz personagem aparece
function aparecePersonagemDormindo(){
	personagemRespirandoCerto.width = 280;
	personagemRespirandoCerto.height = 200;
	personagemRespirandoCerto.x = 632;
	personagemRespirandoCerto.y = 205;
}

// Função que faz com que o personagem acordado desapareça junto com a máscara
function desapareceCpap(){
	aparelhoCpap.width = 0;
	aparelhoCpap.height = 0;

	textoArrasteCpap.alpha = 0;
	
	personagemRespirandoErrado.width = 0;
	personagemRespirandoErrado.height = 0;
}

function apareceCpap() {

	aparelhoCpap.x = 150;
	aparelhoCpap.y = 350;
	aparelhoCpap.width = aparelhoCpapOriginal.width;
	aparelhoCpap.height = aparelhoCpapOriginal.height;
	
	aparelhoCpap.alpha = 0.1;
	tween = game.add.tween(aparelhoCpap).to( { alpha: 1 }, 2000, "Linear", true, 2000);
	tween.onComplete.add(function() {
		textoArrasteCpap.alpha = 1;
	}, this);

	personagemRespirandoErrado.width = personagemRespirandoErradoOriginal.width;
	personagemRespirandoErrado.height = personagemRespirandoErradoOriginal.height;
	personagemRespirandoErrado.scale.x = 1.2;
	personagemRespirandoErrado.scale.y = 1.2;	
}

function desaparecePersonagem(){
	personagemRespirandoCerto.y = 10000;
}

function desabilitaTodasOvelhas() {
	grupoApresentacao.inputEnabled = false;
	grupoTratamentos.inputEnabled  = false;
	grupoCpap.inputEnabled         = false;
	grupoPerguntas.inputEnabled    = false;
}

function habilitaTodasOvelhas() {
	grupoApresentacao.inputEnabled = true;
	grupoTratamentos.inputEnabled  = true;
	grupoCpap.inputEnabled         = true;
	grupoPerguntas.inputEnabled    = true;
}
