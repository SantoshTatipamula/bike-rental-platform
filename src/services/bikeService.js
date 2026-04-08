import bikes from "../data/bikesData";

export const getAllBikes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bikes);
    }, 300); // simulate API delay
  });
};

export const getBikeById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const bike = bikes.find((b) => String(b.id) === String(id));

      if (bike) {
        resolve(bike);
      } else {
        reject("Bike not found");
      }
    }, 300);
  });
};

export const addBike = async (newBike) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      bikes.push({
        id: Date.now().toString(),
        rating:4.5,
        images:newBike.images || [],
        ...newBike,
      });

      resolve({ success: true });
    }, 300);
  });
};

export const deleteBike = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = bikes.findIndex((b) => String(b.id) === String(id));

      if (index !== -1) {
        bikes.splice(index, 1);
      }

      resolve({ success: true });
    }, 300);
  });
};

export const toggleAvailability = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bike = bikes.find((b) => String(b.id) === String(id));

      if (bike) {
        bike.availability =
          bike.availability === "available"
            ? "not_available"
            : "available";
      }

      resolve({ success: true });
    }, 300);
  });
};

export const updateBike = async (id, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = bikes.findIndex((b) => String(b.id) === String(id));

      if (index !== -1) {
        bikes[index] = { ...bikes[index], ...updatedData };
      }

      resolve({ success: true });
    }, 300);
  });
};

