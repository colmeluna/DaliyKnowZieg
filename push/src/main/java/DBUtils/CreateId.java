package DBUtils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Properties;


public class CreateId {

	public static Long newsId()
	{
	    Connection con = null;// 创建一个数据库连接
	    PreparedStatement pre = null;// 创建预编译语句对象，一般都是用这个而不用Statement
	    ResultSet result = null;// 创建一个结果集对象
	    try
	    {
	        Class.forName("oracle.jdbc.driver.OracleDriver");// 加载Oracle驱动程序
	        String url = "jdbc:oracle:thin:@123.57.229.50:1521:orcl";
	        		//Global.getConfig("jdbc.url");// 127.0.0.1是本机地址，XE是精简版Oracle的默认数据库名
	        String user = "maocco";
	        		//Global.getConfig("jdbc.username");// 用户名,系统默认的账户名
	        String password = "mao963(rtsFP2";
	        		//Global.getConfig("jdbc.password");// 你安装时选设置的密码
	        con = DriverManager.getConnection(url, user, password);// 获取连接
	        String sql = "SELECT SEQ_JP_NEWS.nextval as id from dual";// 预编译语句，“？”代表参数
	        pre = con.prepareStatement(sql);// 实例化预编译语句
	        result = pre.executeQuery();// 执行查询，注意括号中不需要再加参数
	        if (result.next()){
	        	return (long) result.getInt("id");
	        	
	        }
	    }
	    catch (Exception e)
	    {
	        e.printStackTrace();
	    }
	    finally
	    {
	        try
	        {
	            // 逐一将上面的几个对象关闭，因为不关闭的话会影响性能、并且占用资源
	            // 注意关闭的顺序，最后使用的最先关闭
	            if (result != null)
	                result.close();
	            if (pre != null)
	                pre.close();
	            if (con != null)
	                con.close();
	            System.out.println("数据库连接已关闭！");
	        }
	        catch (Exception e)
	        {
	            e.printStackTrace();
	        }
	    }
		return null;
	}
	
	public static String getStrforFreeSql()
	{
	    Connection con = null;// 创建一个数据库连接
	    PreparedStatement pre = null;// 创建预编译语句对象，一般都是用这个而不用Statement
	    ResultSet result = null;// 创建一个结果集对象
	    try
	    {
	        Class.forName("oracle.jdbc.driver.OracleDriver");// 加载Oracle驱动程序
	        String url = "jdbc:oracle:thin:@123.57.229.50:1521:orcl";
	        		//Global.getConfig("jdbc.url");// 127.0.0.1是本机地址，XE是精简版Oracle的默认数据库名
	        String user = "maocco";
	        		//Global.getConfig("jdbc.username");// 用户名,系统默认的账户名
	        String password = "mao963(rtsFP2";
	        		//Global.getConfig("jdbc.password");// 你安装时选设置的密码
	        con = DriverManager.getConnection(url, user, password);// 获取连接
	        String sql = "SELECT username from m_user where id = '1493' ";// 预编译语句，“？”代表参数
	        pre = con.prepareStatement(sql);// 实例化预编译语句
	        result = pre.executeQuery();// 执行查询，注意括号中不需要再加参数
	        if (result.next()){
	        	return  result.getString("username");
	        			//(long) result.getInt("id");
	        	
	        }
	    }
	    catch (Exception e)
	    {
	        e.printStackTrace();
	    }
	    finally
	    {
	        try
	        {
	            // 逐一将上面的几个对象关闭，因为不关闭的话会影响性能、并且占用资源
	            // 注意关闭的顺序，最后使用的最先关闭
	            if (result != null)
	                result.close();
	            if (pre != null)
	                pre.close();
	            if (con != null)
	                con.close();
	            System.out.println("数据库连接已关闭！");
	        }
	        catch (Exception e)
	        {
	            e.printStackTrace();
	        }
	    }
		return null;
	}
	
	public static void main(String args[]){
		Long id  = CreateId.newsId();
		 String username = CreateId.getStrforFreeSql();
		System.out.println(id);
		 System.out.println(username);
	}
}
