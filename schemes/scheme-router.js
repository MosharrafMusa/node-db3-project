const express = require("express");

const Schemes = require("./scheme-model.js");

const router = express.Router();

// gets master list of schemes (without steps)
router.get("/", (req, res) => {
  Schemes.find()
    .then((schemes) => {
      res.json(schemes);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get schemes" });
    });
});

//gets a single scheme
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Schemes.findById(id)
    .then((scheme) => {
      if (scheme) {
        res.json(scheme);
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get schemes" });
    });
});

// gets all steps for a given scheme, ordered correctly
router.get("/:id/steps", (req, res) => {
  const { id } = req.params;
  Schemes.findSteps(id)
    .then((steps) => {
      if (steps.length) {
        res.json(steps);
      } else {
        res
          .status(404)
          .json({ message: "Could not find steps for given scheme" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to get steps" });
    });
});

// adds a new scheme
router.post("/", (req, res) => {
  const schemeData = req.body;
  Schemes.add(schemeData)
    .then((scheme) => {
      res.status(201).json(scheme);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new scheme" });
    });
});

// updates a given scheme
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Schemes.findById(id)
    .then((scheme) => {
      if (scheme) {
        Schemes.update(changes, id).then((updatedScheme) => {
          res.json(updatedScheme);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to update scheme" });
    });
});

//  removes a given scheme and all associated steps
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Schemes.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to delete scheme" });
    });
});

// STRETCH GOAL................................................
// Inserts the new step into the database, correctly linking it to the intended scheme.
router.post("/:id/steps", (req, res) => {
  const stepData = req.body;
  const { id } = req.params;
  Schemes.findById(id)
    .then((scheme) => {
      if (scheme) {
        Schemes.addStep(stepData, id).then((step) => {
          res.status(201).json(step);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new step" });
    });
});

module.exports = router;
