import Grandprix from './GrandPrix'
import Drivers from './Drivers'
import Teams from './Teams'

export default {
    paths: {
        ...Grandprix,
        ...Drivers,
        ...Teams
    }
}