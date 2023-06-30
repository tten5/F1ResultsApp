import Grandprix from './GrandPrix'
import Drivers from './Drivers'
import Teams from './Teams'
import Participation from './Participation'

export default {
    paths: {
        ...Grandprix,
        ...Drivers,
        ...Teams,
        ...Participation
    }
}