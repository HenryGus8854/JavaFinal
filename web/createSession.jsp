<%-- 
    Document   : createSession
    Created on : 17-Dec-2022, 18:47:29
    Author     : dudua
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        
        <%
         
         String username =  request.getParameter("username");

            //HttpSession session = request.getSession();

            session.setAttribute("user", username);
         
         RequestDispatcher rd = request.getRequestDispatcher("./quizzesPage.html");
        rd.forward(request, response);

         %>
    </head>
    <body>
        <h1>Hello <%=username %>!</h1>
        
        
    </body>
</html>
