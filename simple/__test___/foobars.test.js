import * as foobars from '../foobar'

test('foobarB', () => {
    const {foobarB} = foobars

    expect(foobarB()).toEqual("foobarB foobarA")
})


test('mocked foobarA', async () => {
    const {foobarB} = foobars

    const mockFoobarA = jest.spyOn(foobars, 'foobarA')
    mockFoobarA.mockReturnValue('mocked foobarA')

    expect(foobarB()).toEqual("foobarB mocked foobarA")

})