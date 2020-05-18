import _ from 'lodash'

export const calculateWeeklyTotal = (input) => {

        var a = _.filter(input, (o) => { return new Date((o.GameDate + ' UTC')) >= new Date('2020-05-11 07:00 UTC') });
        a = _.groupBy(a, "Name");
        a = _.map(a, (game, id) => ({
            Name: id,
            Profit: _.sumBy(game, item => Number(item.Profit)),
        }))
        a = _.orderBy(a, 'Profit', 'desc')
        return a
}

