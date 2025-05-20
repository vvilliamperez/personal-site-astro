export const getFavorites = async () => {
    const favoriteModules = import.meta.glob("../content/favorites/*.ts");
    const favorites = await Promise.all(
      Object.values(favoriteModules).map((module) => module())
    );
    return favorites.map((mod) => mod.favorite);
  };
  
export const getFavoritesByCategory = async () => {
    const favorites = await getFavorites();
    return favorites.reduce((acc, favorite) => {
      const category = favorite.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(favorite);
      return acc;
    }, {} as Record<string, typeof favorites>);
  };
  
export const getWork = async () => {
    const workModules = import.meta.glob("../content/work/*.ts");
    const workItems = await Promise.all(
      Object.values(workModules).map((module) => module())
    );
    return workItems
      .map((mod) => mod.project)
      .sort((a, b) => (a.order || 999) - (b.order || 999));
  };
  