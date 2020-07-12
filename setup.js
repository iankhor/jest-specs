import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import '@testing-library/jest-dom'
import './testLib/server'

configure({ adapter: new Adapter() })
