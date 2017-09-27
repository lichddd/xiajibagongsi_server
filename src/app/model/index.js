import defaultdb from './defaultdb'

import news from './news'
import user from './user'
import visit from './visit'
class Model {
  static news = news
  static user = user
  static visit = visit
}
export default Model
