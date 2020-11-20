import profileReducer, {addPost} from "./profile-reducer";


const state = {
    posts: [
        'Hello my friends!',
        'Turtles are reptiles of the order Testudines. They are characterized ' +
        'by a special bony or cartilaginous shell ' +
        'developed from their ribs that acts as a shield. "Turtle" may refer to the order as a ' +
        'whole (American English) ' +
        'or to fresh-water and sea-dwelling Testudines (British English).',
    ]
};

it('length of posts should be incremented', () => {
    //test data
    const action = addPost('Hello team!');

    //action
    const newState = profileReducer(state, action);

    //expectstion
    expect(newState.posts.length).toBe(3)
})

it('message of new post should be "Hello team!"', () => {
    //test data
    const action = addPost('Hello team!');

    //action
    const newState = profileReducer(state, action);

    //expectstion
    expect(newState.posts[2]).toBe('Hello team!')
})

// it('length of posts should be decremented', () => {
//
// })

