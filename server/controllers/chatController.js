import Message from "../models/Message.js";

export const sendMessage = async (
  req,
  res
) => {

  const message =
    await Message.create({

      report: req.body.report,

      sender: req.user._id,

      message: req.body.message,

    });

  res.json({

    success: true,

    message,

  });

};

export const getMessages = async (
  req,
  res
) => {

  const messages =
    await Message.find({

      report: req.params.id,

    })
      .populate(
        "sender",
        "fullName role"
      )
      .sort({
        createdAt: 1,
      });

  res.json({

    success: true,

    messages,

  });

};