const getCharacter = require('../src/getCharacter');

describe('9 - Implemente os casos de teste da função `getCharacter`', () => {
  it('Verifica se a função `getCharacter` retorna o objeto do personagem corretamente.', () => {

    expect(getCharacter()).toBeUndefined();
   //================================================================================
    const characters = {
      arya: {
        name: 'Arya Stark',
        class: 'Rogue',
        phrases: ['Not today', 'A girl has no name.'],
      },
      brienne: {
        name: 'Brienne Tarth',
        class: 'Knight',
        phrases: ['Im No Lady, Your Grace.', 'I, Brienne Of Tarth, Sentence You To Die.'],
      },
      melissandre: {
        name: 'Melissandre',
        class: 'Necromancer',
        phrases: ['Death By Fire Is The Purest Death.', 'For The Night Is Dark And Full Of Terrors.'],
      },
    };

    expect(getCharacter('Arya')).toMatchObject(characters.arya);

    expect(getCharacter('Brienne')).toMatchObject(characters.brienne);

    expect(getCharacter('Melissandre')).toMatchObject(characters.melissandre);

    expect(getCharacter('aRyA')).toMatchObject(characters.arya);
    expect(getCharacter('BRIENNE')).toMatchObject(characters.brienne);
    expect(getCharacter('MeLIssANdre')).toMatchObject(characters.melissandre);

    expect(getCharacter('not a name')).toBeUndefined();
  });
});
