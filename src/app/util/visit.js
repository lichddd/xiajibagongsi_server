
import model from '../model'

class Visit {
    static async visit(ctx, next)
    {
        if (ctx.url=="/"||ctx.url=="/index.html") {
          model.visit.visit();
        }
        await next();

    }
}
export default Visit;
