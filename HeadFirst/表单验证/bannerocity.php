<html>

  <body>

    <?php
      // 定义变量
      $num = rand(1000, 10000);
      // 预定义的 $_POST 变量用于收集来自 method="post" 的表单中的值
      $message = $_POST['message'];

      $zipcode = $_POST['zipcode'];

      $date = $_POST['date'];

      $name = $_POST['name'];

      $phone = $_POST['phone'];

      $email = $_POST['email'];


      // echo:(在页面上)输出
      echo "<h1>Bannerocity</h1>";

      echo "<h2>Order Confirmation</h2>";

      echo "<strong>Order #" . $num . "</strong><br />";

      echo "Banner message: <span style='font-family:monospace; font-size:x-large'><strong>" . $message . "</strong></span><br />";

      echo "ZIP code: " . $zipcode . "<br />";

      echo "Fly date: " . $date . "<br />";

      echo "Customer name: " . $name . "<br />";

      echo "Phone number: " . $phone . "<br />";

      echo "Email: " . $email . "<br />";

    ?>

  </body>

</html>

