from sklearn.cluster import DBSCAN
import numpy as np
Student = np.array([[1, 2], [2, 2], [2, 3], [8, 7], [8, 8], [25, 80]])
Restaurant = np.array([[8, 9], [10, 12], [22, 32], [18, 17], [18, 18], [25, 80]])
Studentclustering = DBSCAN(eps=3, min_samples=2).fit(Student)

Restaurantclustering = DBSCAN(eps=3, min_samples=2).fit(Student)
print(Restaurantclustering.labels_)
print(Studentclustering.labels_)
