import * as React from 'react';
// import renderer from 'react-test-renderer';
// import { Provider } from 'react-redux';
// import configureMockStore from 'redux-mock-store';
import Test from '../screens/PendingApplicationDetails';
// import { CommentViewOnly } from '../components/CommentViewOnly';
import { shallow } from 'enzyme'


// const mockStore = configureMockStore();
// const store = mockStore(initialState, details, comments);

/*
describe('PendingApplicationDetails Page', () => {
      let store;
      let component;

      beforeEach(() => {
        store = mockStore({
          candidateInfo: [{
            first_name: "Jac",
            last_name: "Wong",
            email: "jac@msn.com",
            education_certificate:
              "Master degree in Shopping dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf",
            instrument_1: "Piano",
            level_of_skil_1: 1,
            instrument_2: "Guitar",
            level_of_skil_2: 3,
            instrument_3: "",
            level_of_skil_3: 0,
            summary:
              "Summary dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf dushfuafhl  fhewae ew hfh wfehwfweh ewfhfhwefhwehfauf",
            referral: "Franco A",
            language_English: "true",
            language_Mandarin: "true",
            language_Cantonese: "",
            experience:
              "experience hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf hewae ew hfh wfehwfweh ewfhfhwefhwehfauf ",
            upload_1:
              "https://firebasestorage.googleapis.com/v0/b/rich-charmer-252008.appspot.com/o/images%2F24.jpg?alt=media&token=f5507fff-efef-47af-8e8a-51bede46c246",
            upload_2:
              "https://firebasestorage.googleapis.com/v0/b/rich-charmer-252008.appspot.com/o/images%2F24.jpg?alt=media&token=f5507fff-efef-47af-8e8a-51bede46c246",
            upload_3: "",
            account_id: 8
          }]
        })
      })
      
      component = renderer.create(
        <Provider store={store}>
            <PendingApplicationDetails />
        </Provider>
      );
        // console.log(component.dive())
        // expect(component.find('h3.test').length).toEqual(1);

    it('renders with given state from Redux Store', () => {
      expect(component.toJSON()).toMatchSnapshot();
    });
});


// it('invokes ComponentDidMount when mounted', () => {
//   const getSpy = jest.spyOn(axios, 'get');
//   const wrapper = shallow(<CommentViewOnly />);
//   expect(getSpy).toBeCalled();
//   // PendingApplicationDetails.prototype.componentDidMount.mockRestore();
// });

*/

describe('PendingApplicationDetails ',()=>{

  const wrapper = shallow(<Test />)

  it('renders a button', ()=>{
    expect(wrapper.find('div.hello').length).toEqual(1)
  })

})