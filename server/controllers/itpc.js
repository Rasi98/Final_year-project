import ITPC from "../models/itpc.js";

export const getitpc = async (req, res) => {
  try {
    const itpcList = await ITPC.find();
    console.log(itpcList);
    res.status(200).json(itpcList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const additpc = async (req, res) => {
  const itpcData = req.body;
  const newitpc = new ITPC(itpcData);
  try {
    await newitpc.save();
    res.status(201).json(newitpc);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteitpc = (req, res) => {
  ITPC.findByIdAndDelete(req.params.id)
    .then(() => res.json("ITPC deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateitpc = (req, res) => {
  ITPC.findById(req.params.id)
    .then((itpc) => {
      itpc.username = req.body.username;
      itpc.name = req.body.name;
      itpc.email = req.body.email;
      itpc.phone = req.body.phone;
      itpc
        .save()
        .then(() => res, json("ITPC updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
};