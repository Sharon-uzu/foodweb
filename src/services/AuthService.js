const BASE_URL = 'https://scanorder-server.vercel.app/api/v1';


class AuthService {

 static getToken() {
      return localStorage.getItem("token");
    }

    // Format the login response after a successful login
    static formatLoginResponse(response) {
      if (
        response &&
        response.data &&
        response.data.access_token &&
        response.data.email
      ) {
        return {
          token: response.data.access_token,
          user: {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            companyName: response.data.companyName,
            phone: response.data.phone,
            role: response.data.role,
            service: response.data.service,
            status: response.data.status,
          },
        };
      } else {
        throw new Error("Invalid login response format.");
      }
    }
    // static getToken() {
    //   return localStorage.getItem("token");
    // }
    // Login function that calls the API to authenticate the user
    static async login(email, password) {
      try {
        const response = await fetch("https://scanorder-server.vercel.app/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to authenticate");
        }
  
        const data = await response.json();
  
        // Format and return the login response
        return AuthService.formatLoginResponse(data);
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    }

    static async getUserServices(userId) {
      const token = localStorage.getItem('token'); // or however you store it
      const res = await fetch(`https://scanorder-server.vercel.app/api/v1/user/services/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch services');
      }
  
      const data = await res.json();
      return data.data; // assuming your API structure
    }

    static async createServiceItem(itemData) {
      const token = localStorage.getItem('token');
    
      const response = await fetch("https://scanorder-server.vercel.app/api/v1/user/service-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });
    
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create service item");
      }
    
      const data = await response.json();
      return data;
    }
    static async getServiceItems(serviceId) {
      const token = AuthService.getToken(); // adjust if you use a different method
      const response = await fetch(`https://scanorder-server.vercel.app/api/v1/user/service-item/${serviceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch service items');
      }
    
      return response.json();
    }
    
    static async createScanPoint(scanData) {
      const token = localStorage.getItem("token");
    
      const response = await fetch("https://scanorder-server.vercel.app/api/v1/user/scan-point", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(scanData),
      });
    
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create scan point");
      }
    
      const data = await response.json();
      return data;
    }
    
    static async getScanPoints() {
      const token = localStorage.getItem('token');
  
      const res = await fetch(`${BASE_URL}/user/scan-points`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch scan points');
      }
  
      const data = await res.json();
      return data.data;
    }


    static async deleteScanPoint(scanPointId) {
      const token = localStorage.getItem('token');
    
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
    
      const raw = JSON.stringify({ scanPointId });
    
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
    
      const response = await fetch('https://scanorder-server.vercel.app/api/v1/user/scan-point', requestOptions);
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      return response.text(); // or response.json(), depending on API
    }
    
    
    static async deleteService(serviceId) {
      const token = AuthService.getToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${BASE_URL}/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
      
      return response.json();
    }


    static async getServiceItemsByServiceId(serviceId) {
      const token = AuthService.getToken();
    
      const response = await fetch(`${BASE_URL}/user/service-items/${serviceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error('Failed to fetch service items by service ID');
      }
    
      const data = await response.json();
      return data.data; // return just the items array
    }
    

    static async deleteScanPoint(scanPointId) {
      const token = localStorage.getItem('token');
      const response = await fetch('https://scanorder-server.vercel.app/api/v1/user/delete-scan-point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ scanPointId }),
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    
      return await response.text(); // Or response.json() if the backend returns JSON
    }
    
    static async deleteService(serviceId) {
      const token = localStorage.getItem('token');
      const response = await fetch('https://scanorder-server.vercel.app/api/v1/user/delete-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "serviceId": "r3kf r3re"
        }),
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    
      return await response.text(); // Or response.json() if the backend returns JSON
    }
  
  }
  
  export default AuthService;
  