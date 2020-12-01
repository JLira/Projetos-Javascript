import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const chekIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!chekIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load Notifications' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true } // retorna o registro atualizado
    );
    return res.json(notification);
  }
}
export default new NotificationController();
